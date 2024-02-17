import { Server } from 'socket.io'

export default function SocketHandler(req: any, res: any) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    interface Offer {
        offererUserName?: string
        offer?: string
        offerIceCandidates?: []
        answererUserName?: string | null
        answer?: string | null
        answererIceCandidates?: []
    }

    const offers: Offer[] = []

    interface ConnectedSocket {
        socketId: string
        userName: string
    }
    const connectedSockets: ConnectedSocket[] = []

    const rooms: any = {}

    io.on('connection', (socket: any) => {
        console.debug('User connected: ', socket.id)

        socket.emit('rooms', rooms)

        socket.on('join room', (room: any) => {
            if (socket.rooms) {
                socket.leave(socket.room)
                rooms[socket.room]--
                if (rooms[socket.room] === 0) {
                    delete rooms[socket.room]
                }
            }
            socket.join(room)
            socket.room = room

            const username = ''

            socket.username = username

            if (!rooms[room]) {
                rooms[room] = {
                    admin: socket.id,
                    users: {},
                }
            }

            rooms[room].users[socket.id] = {
                username
            }

            io.emit('rooms', rooms)

            console.debug(`User ${socket.id} joined room ${room} with username ${username}`)

            console.debug(`Emitting 'join room' event to user ${socket.id} with room ${room}`)

            socket.emit('join room', { room, username })
        })

        socket.on('leave', () => {
            if (socket.room) {
                socket.leave(socket.room)
                rooms[socket.room]--
                if (rooms[socket.room] === 0) {
                    delete rooms[socket.room]
                }
                io.emit('rooms', rooms)
                console.debug(`User ${socket.id} left room ${socket.room}`)
                socket.room = null
            }
        })

        socket.on('disconnect', () => {
            if (socket.room) {
                socket.leave(socket.room)
                rooms[socket.room]--
                if (rooms[socket.room] === 0) {
                    delete rooms[socket.room]
                }
                io.emit('rooms', rooms)
            }
            console.debug('User disconnected: ', socket.id)
        })

        socket.on('message', (data: any) => {
            const { room, message } = data
            io.to(room).emit('message', { username: socket.id, message, room })

            console.debug(`User ${socket.id} sent message '${message} to room ${room}`)
        })





        // // webRTC code

        // // console.log('Someone has connected')
        // const userName = socket.handshake.auth.userName
        // const password = socket.handshake.auth.password

        // if (password !== 'x') {
        //     socket.disconnect(true)
        //     return
        // }
        // connectedSockets.push({
        //     socketId: socket.id,
        //     userName
        // })

        // //a new client has joined. If there are any offers available,
        // //emit them out
        // if (offers.length) {
        //     socket.emit('availableOffers', offers)
        // }

        // socket.on('newOffer', newOffer => {
        //     offers.push({
        //         offererUserName: '',
        //         offer: newOffer,
        //         offerIceCandidates: [],
        //         answererUserName: null,
        //         answer: null,
        //         answererIceCandidates: []
        //     })
        //     //send out to all connected sockets EXCEPT the caller
        //     socket.broadcast.emit('newOfferAwaiting', offers.slice(-1))
        // })

        // socket.on('newAnswer', (offerObj, ackFunction) => {
        //     console.log(offerObj)
        //     //emit this answer (offerObj) back to CLIENT1
        //     //in order to do that, we need CLIENT1's socketid
        //     const socketToAnswer = connectedSockets.find(s => s.userName === offerObj.offererUserName)
        //     if (!socketToAnswer) {
        //         console.log('No matching socket')
        //         return
        //     }
        //     //we found the matching socket, so we can emit to it!
        //     const socketIdToAnswer = socketToAnswer.socketId
        //     //we find the offer to update so we can emit it
        //     const offerToUpdate = offers.find(o => o.offererUserName === offerObj.offererUserName)
        //     if (!offerToUpdate) {
        //         console.log('No OfferToUpdate')
        //         return
        //     }
        //     //send back to the answerer all the iceCandidates we have already collected
        //     ackFunction(offerToUpdate.offerIceCandidates)
        //     offerToUpdate.answer = offerObj.answer
        //     offerToUpdate.answererUserName = userName
        //     //socket has a .to() which allows emiting to a 'room'
        //     //every socket has it's own room
        //     socket.to(socketIdToAnswer).emit('answerResponse', offerToUpdate)
        // })

        // socket.on('sendIceCandidateToSignalingServer', iceCandidateObj => {
        //     const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj

        //     if (didIOffer) {
        //         //this ice is coming from the offerer. Send to the answerer
        //         const offerInOffers = offers.find(o => o.offererUserName === iceUserName)
        //         if (offerInOffers) {
        //             offerInOffers.offerIceCandidates?.push(iceCandidate)
        //             // 1. When the answerer answers, all existing ice candidates are sent
        //             // 2. Any candidates that come in after the offer has been answered, will be passed through
        //             if (offerInOffers.answererUserName) {
        //                 //pass it through to the other socket
        //                 const socketToSendTo = connectedSockets.find(s => s.userName === offerInOffers.answererUserName)
        //                 if (socketToSendTo) {
        //                     socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate)
        //                 } else {
        //                     console.log('Ice candidate recieved but could not find answere')
        //                 }
        //             }
        //         }
        //     } else {
        //         //this ice is coming from the answerer. Send to the offerer
        //         //pass it through to the other socket
        //         const offerInOffers = offers.find(o => o.answererUserName === iceUserName)
        //         const socketToSendTo = connectedSockets.find(s => s.userName === offerInOffers?.offererUserName)
        //         if (socketToSendTo) {
        //             socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate)
        //         } else {
        //             console.log('Ice candidate recieved but could not find offerer')
        //         }
        //     }
        // })

        console.debug('setting socket')
        res.end()
    })
}
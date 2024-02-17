import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'

export const config = {
    api: {
        bodyParser: false,
    }
}

interface RoomsDict {
    [index: string]: Room
}

interface Room {
    admin: string
    users: {
        [index: string]: User
    }
}

interface User {
    username: string
}

const rooms: RoomsDict = {}

const connectedSockets = []

const ioHandler = (req: any, res: any) => {
    if (res.socket.server.io) {
        res.end()
        return
    }

    const path= '/api/socket/io'
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
        path,
        addTrailingSlash: false,
        cors: {
            origin: '*'
        }
    })
    res.socket.server.io = io

    io.on('connection', (socket: any) => {
        console.debug('User connected: ', socket.id)

        const leaveRoom = () => {
            console.log('leave room', socket.room)
            rooms[socket.room] && delete rooms[socket.room].users[socket.id]
            if (Object.keys(rooms[socket.room]?.users ?? {}).length === 0) {
                delete rooms[socket.room]
            }
        }

        socket.emit('rooms', rooms)

        socket.on('join room', (room: any) => {
            console.log('join room', { id: socket.id, room })
            if (socket.room) {
                socket.leave(socket.room)
                leaveRoom()
            }
            socket.join(room)
            socket.room = room

            const username = 'mjweather'

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

            // notify everyone of room change
            io.emit('rooms', rooms)

            console.debug(`User ${socket.id} joined room ${room} with username ${username}`)

            console.debug(`Emitting 'join room' event to user ${socket.id} with room ${room}`)

            socket.emit('join room', { room, username })
        })

        socket.on('leave', () => {
            console.log('leave', { id: socket.id, room: socket.room })
            if (socket.room) {
                socket.leave(socket.room)
                leaveRoom()
                io.emit('rooms', rooms)
                console.debug(`User ${socket.id} left room ${socket.room}`)
                socket.room = null
            }
        })

        socket.on('disconnect', () => {
            console.log('leave', { id: socket.id, room: socket.room })
            if (socket.room) {
                socket.leave(socket.room)
                leaveRoom()
                io.emit('rooms', rooms)
            }
            console.debug('User disconnected: ', socket.id)
        })

        socket.on('message', (data: any) => {
            console.log('message', { id: socket.id, data })
            const { room, message } = data
            io.to(room).emit('message', { username: socket.id, message, room })

            console.debug(`User ${socket.id} sent message '${message} to room ${room}`)
        })
    })

    res.end()
}

export default ioHandler
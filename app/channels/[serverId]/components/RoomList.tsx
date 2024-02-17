'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSocket } from '@/components/providers/socket-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Room {
    label: string
    key: string
    users: string[]
}

export function RoomList() {
    const [rooms, setRooms] = useState<Room[]>([
        { label: 'room-1', key: '9c8cddf7-b676-4cae-a264-d9e8aa7c02e5', users: [] },
        { label: 'room-2', key: '5331f027-2ae3-4c94-87f9-13bb7c464502', users: [] },
        { label: 'room-3', key: '9870ce60-a7b7-4521-8862-8ff16d010073', users: [] },
    ])
    const [activeRoom, setActiveRoom] = useState<Room | null>(null)
    const { socket } = useSocket()

    useEffect(() => {
        socket?.on('rooms', (roomsObj: any) => {
            if (roomsObj) {
                Object.entries(roomsObj).forEach(([label, room]) => {
                    const roomIndex = rooms.findIndex(r => r.label === label)
                    if (roomIndex !== -1) {
                        setRooms(rooms.map((r, i) =>
                            i === roomIndex
                                ? { ...r, users: Array.from(new Set(Object.values((room as any).users).map(({ username }: any) => username))) }
                                : r
                        ))
                    }
                })
            }
            console.debug('rooms', rooms)
        })
        socket?.on('join room', ({ room, username }: any) => {
            console.debug('join room', room, username)
            const roomIndex = rooms.findIndex(r => r.label === room)
            if (roomIndex !== -1) {
                setRooms(rooms.map((r, i) =>
                    i === roomIndex
                        ? { ...r, users: Array.from(new Set([...rooms[roomIndex].users, username]))}
                        : r
                ))
            }
        })

        return () => {
            socket?.off('rooms')
            socket?.off('join room')
        }
    }, [socket, rooms])

    const joinRoom = async (room: Room) => {
        socket.emit('join room', room.label)
        setActiveRoom(room)
    }

    const disconnect = () => {
        socket.event('leave')
        setActiveRoom(null)
    }

    return (
        <div className="flex-1 flex flex-col justify-between">
            <nav className="flex-1 flex flex-col px-1">
                {rooms.map(room => (
                    <>
                        <button
                            className={cn(
                                'flex p-1 rounded-sm text-sm items-center justify-start text-zinc-50 hover:bg-zinc-700/70 mb-1',
                                activeRoom?.key === room.key && 'bg-zinc-700'
                            )}
                            key={room.key}
                            onClick={() => joinRoom(room)}
                        >
                            <Volume2 className="text-zinc-500 mr-2 align-middle flex" size={20} />
                            {room.label}
                        </button>
                        {room.users?.map((user: string) => (
                            <div className="flex ml-6 mb-1" key={user}>
                                <Avatar className="h-5 w-5">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="uppercase text-xs">{user?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm ml-2 mr-4">{user}</div>
                            </div>
                        ))}
                    </>
                ))}
            </nav>

            {activeRoom !== null && (
                <Button
                    className="bg-red-600 hover:bg-red-600/90 rounded-none"
                    onClick={disconnect}
                >
                    Disconnect
                </Button>
            )}

        </div>
    )
}
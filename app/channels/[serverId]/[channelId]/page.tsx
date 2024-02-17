'use client'
import { ServerNav } from '../components/ServerNav'
import { ChannelList } from '../components/ChannelList'
import { RoomList } from '../components/RoomList'
import { Separator } from '@/components/ui/separator'

import { Chat } from '@/components/chat/chat'
import { ServerHeader } from '@/components/server/server-header'

export default function Page({ params }: any) {
    const { serverId, channelId } = params
    return (
        <div className="flex min-h-screen text-zinc-400">
            <ServerNav />
            <div className="min-w-56 bg-zinc-800 flex flex-col">
                <ServerHeader title={serverId} />
                <ChannelList />
                <Separator className="bg-zinc-700 my-1 w-4/5 self-center" />
                <RoomList />
            </div>
            <Chat />
        </div>
    )
} 
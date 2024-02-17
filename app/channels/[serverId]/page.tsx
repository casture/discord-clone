'use client'
import { redirect } from 'next/navigation'
import { ServerNav } from './components/ServerNav'
import { ChannelList } from './components/ChannelList'
import { Separator } from '@/components/ui/separator'

import { Button } from '@/components/ui/button'

export default function Page({ params }: any) {
    const { serverId } = params
    if (serverId !== 'me') {
        const channelId = '55555'
        redirect(`/channels/${serverId}/${channelId}`)
    }
    return (
        <div className="flex min-h-screen text-zinc-400">
            <ServerNav />
            <div className="min-w-56 bg-zinc-800 flex flex-col">
                <Button variant="ghost" className="rounded-none justify-start text-zinc-50">{serverId}</Button>
                <ChannelList />
            </div>
            <div className="flex-1 bg-zinc-700 flex flex-col">
                <div className="flex gap-2 w-full p-4">
                    <Button>Call</Button>
                    <Button>End call</Button>
                </div>
            </div>
        </div>
    );
} 
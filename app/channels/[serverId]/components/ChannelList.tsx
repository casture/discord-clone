import { Button } from '@/components/ui/button'
import { Hash } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChannelList() {
    const channel = [
        { label: 'channel-1', key: '9c8cddf7-b676-4cae-a264-d9e8aa7c02zz' },
        { label: 'channel-2', key: '5331f027-2ae3-4c94-87f9-13bb7c4645zz' },
        { label: 'channel-3', key: '9870ce60-a7b7-4521-8862-8ff16d0100zz' },
    ]
    return (
        <nav className="flex flex-col mt-2">
            {channel.map(channel => (
                <button
                    className={cn(
                        'flex p-1 rounded-sm text-sm items-center justify-start text-zinc-50 hover:bg-zinc-700/70 mb-1'
                    )}
                    key={channel.key}
                >
                    <Hash className="text-zinc-500 mr-2" size={20} />
                    {channel.label}
                </button>
            ))}
        </nav>
    )
}
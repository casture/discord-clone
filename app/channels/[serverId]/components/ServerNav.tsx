'use client'
import { useState } from "react"
import Link from "next/link"
import { CreateServerDialog } from '@/components/modals/create-server'
import { Server } from "@prisma/client"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip } from "@/components/ui/tooltip"

export function ServerNav() {
    const [refreshCount, setRefreshCount] = useState(0)

    const { isPending, error, data: servers } = useQuery({
        queryKey: ['servers'],
        queryFn: () =>
            fetch('/api/server')
                .then((res) => res.json() as Promise<Server[]>),
    })

    if (isPending) return <ServerNavSkeleton />

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Sidebar>
            {servers.map(server => (
                <Link href={`/channels/${server.id}`} key={server.id}>
                    <img
                        src={server.imageUrl ?? "https://avatars.githubusercontent.com/u/3672534?v=4"}
                        width="50"
                        height="50"
                        alt={server.name}
                        className={`rounded-3xl hover:rounded-xl transition-all ease-in-out size-[50px]`}
                    />
                </Link>
            ))}
            {refreshCount}
            <CreateServerDialog refreshParent={() => setRefreshCount(refreshCount + 1)} />
        </Sidebar>
    )
}

function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-w-20 flex flex-col gap-3 p-4 bg-zinc-900">
            {children}
        </div>
    )
}

function ServerNavSkeleton() {
    return (
        <Sidebar>
            <Skeleton className="size-[50px] rounded-full" />
            <Skeleton className="size-[50px] rounded-full" />
        </Sidebar>
    )
}
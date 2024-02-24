'use client'
import Link from "next/link"
import { CreateServerDialog } from '@/components/modals/create-server'
import { useEffect, useState } from "react"
import { Server } from "@prisma/client"
import { useQuery } from '@tanstack/react-query'

export function ServerNav() {
    const { isPending, error, data: servers } = useQuery({
        queryKey: ['servers'],
        queryFn: () =>
          fetch('/api/server')
            .then((res) => res.json() as Promise<Server[]>),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="min-w-16 flex flex-col gap-3 p-3 bg-zinc-900">
            {servers.map(server => (
                <Link href={`/channels/${server.id}`}>
                    <img
                        src={server.imageUrl ?? "https://avatars.githubusercontent.com/u/3672534?v=4"}
                        width="50"
                        height="50"
                        alt={server.name}
                        className={`rounded-3xl hover:rounded-xl transition-all ease-in-out`}
                    />
                </Link>
            ))}
            <CreateServerDialog />
        </div>
    )
} 
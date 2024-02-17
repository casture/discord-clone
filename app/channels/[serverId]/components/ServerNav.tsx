'use client'
import Link from "next/link"
import { CreateServerDialog } from '@/components/modals/create-server'

export function ServerNav() {
    return (
        <div className="min-w-16 flex flex-col gap-3 p-3 bg-zinc-900">
            {/* <Link href="/channels/me">
                <img
                    src="https://github.com/shadcn.png"
                    width="50"
                    height="50"
                    alt="Picture"
                    className="rounded-3xl hover:rounded-xl transition-all"
                />
            </Link>
            <Separator className="bg-zinc-600" /> */}
            <Link href="/channels/22222">
                <img
                    src="https://avatars.githubusercontent.com/u/3672534?v=4"
                    width="50"
                    height="50"
                    alt="Picture"
                    className={`rounded-3xl hover:rounded-xl transition-all ease-in-out`}
                />
            </Link>
            <CreateServerDialog />
        </div>
    )
} 
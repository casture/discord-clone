import { SocketIndicator } from "@/components/socket-indicator";

interface ChatHeaderParams {
    title: string
}

export function ChatHeader ({ title }: ChatHeaderParams) {
    return (
        <div className="flex justify-between w-full p-3 border-b border-zinc-900">
            <h1>{title}</h1>
            <SocketIndicator />
        </div>
    )
}
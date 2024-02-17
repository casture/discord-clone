import { ChatHeader } from "@/components/chat/chat-header";

export function Chat() {
    return (
        <div className="flex flex-col w-screen min-h-full bg-zinc-900/90">
            <ChatHeader title={'hello'} />
        </div>
    )
}
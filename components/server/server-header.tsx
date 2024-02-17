interface ServerHeaderParams {
    title: string
}

export function ServerHeader ({ title }: ServerHeaderParams) {
    return (
        <div className="flex justify-between w-full p-3 border-b border-zinc-900">
            <h1>{title}</h1>
        </div>
    )
}
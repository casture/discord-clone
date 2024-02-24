import { prisma } from '../../../db'
import { Server } from '@prisma/client'

export async function GET(
    request: Request
) {
    const servers = await prisma.server.findMany()
    return Response.json(servers)
}

export async function POST(
    request: Request
) {
    try {
        const body = await request.json()
        console.log({ body })
        const server = await prisma.server.create({
            data: body
        })
        console.log({ server })
        return new Response(JSON.stringify(server), { status: 201 })
    } catch (err) {
        console.error(err)
        return new Response('Internal Server Error', { status: 500 })
    }
}
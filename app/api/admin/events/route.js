import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {

  const events = await prisma.event.findMany()

  return NextResponse.json(events)

}

export async function POST(req) {

  const body = await req.json()

  const event = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      venue: body.venue,
      maxParticipants: parseInt(body.maxParticipants)
    }
  })

  return NextResponse.json(event)

}

export async function DELETE(req) {

  const body = await req.json()

  await prisma.event.delete({
    where: { id: body.id }
  })

  return NextResponse.json({ message: "deleted" })

}

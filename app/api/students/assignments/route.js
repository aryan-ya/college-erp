import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req){

  try{

    const body = await req.json()

    const assignment = await prisma.assignment.create({
      data:{
        title: body.title,
        description: body.description,
        dueDate: new Date(body.dueDate),
        departmentId: Number(body.departmentId)
      }
    })

    return NextResponse.json(assignment)

  }catch(error){

    console.log(error)

    return NextResponse.json(
      {message:"Error creating assignment"},
      {status:500}
    )
  }
}
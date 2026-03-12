import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req){

  try{

    const body = await req.json()

    const attendance = await prisma.attendance.create({
      data:{
        studentId:Number(body.studentId),
        date:new Date(),
        status:body.status
      }
    })

    return NextResponse.json(attendance)

  }catch(error){

    return NextResponse.json(
      {message:"Error marking attendance"},
      {status:500}
    )

  }

}
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(){

  try{

    const students = await prisma.student.findMany({
      include:{
        department:true
      }
    })

    return NextResponse.json(students)

  }catch(error){

    return NextResponse.json(
      {message:"Error fetching profile"},
      {status:500}
    )

  }

}
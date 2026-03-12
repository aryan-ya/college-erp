import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(){

  try{

    const courses = await prisma.course.findMany({
      include:{
        department:true
      }
    })

    return NextResponse.json(courses)

  }catch(error){

    return NextResponse.json(
      {message:"Error fetching courses"},
      {status:500}
    )

  }

}
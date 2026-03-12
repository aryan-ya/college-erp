import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {

  try {

    const students = await prisma.student.findMany({
      include: {
        department: true
      }
    })

    const formatted = students.map(s => ({
      id: s.id,
      name: s.name,
      rollNo: s.id.slice(0,8),
      department: s.department?.name,
      email: s.email,
      phone: s.phone,
      year: `${new Date().getFullYear() - s.admissionYear + 1} Year`,
      semester: "4th Semester",
      attendance: Math.floor(Math.random()*20)+80,
      status: s.status,
      avatar: s.name
        .split(" ")
        .map(n=>n[0])
        .join("")
    }))

    return NextResponse.json(formatted)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message:"Server Error" },
      { status:500 }
    )

  }

}
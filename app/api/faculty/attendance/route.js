import { NextResponse } from "next/server"

let attendance = []

// GET attendance

export async function GET(){

return NextResponse.json(attendance)

}

// MARK attendance

export async function POST(request){

const body = await request.json()

const record = {
id:Date.now(),
studentId:body.studentId,
courseId:body.courseId,
status:body.status,
date:new Date()
}

attendance.push(record)

return NextResponse.json({
message:"Attendance marked",
record
})

}
import { NextResponse } from "next/server"

let assignments = []

// GET assignments

export async function GET(){

return NextResponse.json(assignments)

}

// POST assignment

export async function POST(request){

const body = await request.json()

const assignment = {
id:Date.now(),
title:body.title,
courseId:body.courseId,
description:body.description,
dueDate:body.dueDate,
createdAt:new Date()
}

assignments.push(assignment)

return NextResponse.json({
message:"Assignment created",
assignment
})

}
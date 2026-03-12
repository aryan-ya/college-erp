import { NextResponse } from "next/server"

let submissions = [

{
id:1,
assignmentId:1,
studentName:"Rahul Kumar",
rollNo:"CS202401",
file:"assignment1.pdf",
submittedAt:new Date(),
status:"submitted",
marks:null,
feedback:null
},

{
id:2,
assignmentId:1,
studentName:"Priya Singh",
rollNo:"CS202402",
file:"assignment1_priya.pdf",
submittedAt:new Date(),
status:"submitted",
marks:null,
feedback:null
}

]

// GET submissions (faculty view)

export async function GET() {

return NextResponse.json(submissions)

}

// UPDATE submission (grade / feedback)

export async function PUT(request) {

const body = await request.json()

const submission = submissions.find(
s => s.id === body.id
)

if(!submission){

return NextResponse.json(
{message:"Submission not found"},
{status:404}
)

}

submission.marks = body.marks
submission.feedback = body.feedback
submission.status = "checked"

return NextResponse.json({
message:"Submission graded",
submission
})

}
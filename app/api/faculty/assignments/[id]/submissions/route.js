import { NextResponse } from "next/server"

let submissions = [

{
id:1,
assignmentId:"1",
studentName:"Rahul Kumar",
rollNo:"CS202401",
file:"assignment1.pdf",
submittedAt:new Date(),
marks:null,
feedback:null
},

{
id:2,
assignmentId:"1",
studentName:"Priya Singh",
rollNo:"CS202402",
file:"assignment1_priya.pdf",
submittedAt:new Date(),
marks:null,
feedback:null
}

]

export async function GET(request,{params}){

const assignmentId = params.id

const filtered = submissions.filter(
s => s.assignmentId === assignmentId
)

return NextResponse.json(filtered)

}
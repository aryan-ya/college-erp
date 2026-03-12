import { NextResponse } from "next/server"

export async function GET(){

const courses = [

{
id:1,
name:"Mathematics",
code:"MATH101",
semester:"4th Semester",
students:45
},

{
id:2,
name:"Physics",
code:"PHY101",
semester:"4th Semester",
students:40
},

{
id:3,
name:"Computer Science",
code:"CS101",
semester:"3rd Semester",
students:52
}

]

return NextResponse.json(courses)

}
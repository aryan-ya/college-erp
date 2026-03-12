import prisma from "@/lib/db"

export async function GET(){

const students = await prisma.student.findMany({
include:{
department:true
}
})

return Response.json(students)

}

export async function POST(req){

const body = await req.json()

const student = await prisma.student.create({

data:{

name:body.name,
email:body.email,
phone:body.phone,
admissionYear:parseInt(body.admissionYear),
status:body.status,
departmentId:body.departmentId

}

})

return Response.json(student)

}

export async function DELETE(req){

const body = await req.json()

await prisma.student.delete({
where:{id:body.id}
})

return Response.json({message:"Deleted"})

}
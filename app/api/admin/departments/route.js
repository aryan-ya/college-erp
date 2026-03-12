import prisma from "@/lib/db"

export async function GET() {

  const departments = await prisma.department.findMany()

  return Response.json(departments)

}

export async function POST(req) {

  const body = await req.json()

  const department = await prisma.department.create({
    data:{
      name: body.name
    }
  })

  return Response.json(department)

}

export async function PUT(req){

  const body = await req.json()

  const department = await prisma.department.update({
    where:{ id: body.id },
    data:{ name: body.name }
  })

  return Response.json(department)

}

export async function DELETE(req){

  const body = await req.json()

  await prisma.department.delete({
    where:{ id: body.id }
  })

  return Response.json({message:"Deleted"})
}
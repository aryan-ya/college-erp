import prisma from "@/lib/db"

export async function GET() {

  try {

    const faculty = await prisma.faculty.findMany({
      include: { department: true }
    })

    return Response.json(faculty)

  } catch (error) {

    console.log(error)

    return Response.json(
      { error: "Failed to fetch faculty" },
      { status: 500 }
    )

  }

}

export async function POST(req) {

  try {

    const body = await req.json()

    const faculty = await prisma.faculty.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        designation: body.designation,
        departmentId: parseInt(body.departmentId)
      }
    })

    return Response.json(faculty)

  } catch (error) {

    console.log(error)

    return Response.json(
      { error: "Failed to create faculty" },
      { status: 500 }
    )

  }

}

export async function DELETE(req) {

  try {

    const body = await req.json()

    await prisma.faculty.delete({
      where: { id: body.id }
    })

    return Response.json({ message: "deleted" })

  } catch (error) {

    console.log(error)

    return Response.json(
      { error: "Failed to delete faculty" },
      { status: 500 }
    )

  }

}
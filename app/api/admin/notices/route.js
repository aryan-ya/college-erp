import prisma from "@/lib/db"

// GET all notices
export async function GET(){

  try{

    const notices = await prisma.notice.findMany({
      orderBy:{
        date:"desc"
      }
    })

    return Response.json(notices)

  }catch(error){

    return Response.json(
      {error:"Failed to fetch notices"},
      {status:500}
    )

  }

}


// CREATE notice
export async function POST(req){

  try{

    const body = await req.json()

    const notice = await prisma.notice.create({

      data:{
        title:body.title,
        content:body.content
      }

    })

    return Response.json(notice)

  }catch(error){

    return Response.json(
      {error:"Failed to create notice"},
      {status:500}
    )

  }

}


// DELETE notice
export async function DELETE(req){

  try{

    const body = await req.json()

    await prisma.notice.delete({
      where:{id:body.id}
    })

    return Response.json({message:"Notice deleted"})

  }catch(error){

    return Response.json(
      {error:"Failed to delete notice"},
      {status:500}
    )

  }

}
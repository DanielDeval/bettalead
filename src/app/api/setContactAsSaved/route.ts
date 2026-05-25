import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    const {orgID} = await req.json()
    const goSeTtoContacted = await prisma.contacts.update({
        where:{id:orgID},
        data:{contacted:true,contacteddate:  new Date()}
    })
    return NextResponse.json(goSeTtoContacted,{status:200})
}
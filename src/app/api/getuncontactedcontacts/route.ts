import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    const {orgID} = await req.json()
    const contacts = await prisma.contacts.findMany(
       { where: {organisationID:orgID,
        contacted: false
       }}
    )
    return NextResponse.json(contacts,{status:200})
}
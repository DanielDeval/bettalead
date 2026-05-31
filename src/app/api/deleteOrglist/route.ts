import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id} = await req.json()
const DeleteThePart = await prisma.organisationlist.deleteMany({
    where: {OrgID: id}
})
return NextResponse.json(DeleteThePart,{status:200})
}
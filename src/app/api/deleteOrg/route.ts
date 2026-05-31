import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id} = await req.json()
const DeleteThePart = await prisma.organisation.delete({
    where: {id: id}
})
return NextResponse.json(DeleteThePart,{status:200})
}
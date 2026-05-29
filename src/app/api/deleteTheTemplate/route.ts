import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id, text} = await req.json()
const DeleteThePart = await prisma.templates.delete({
    where: {id: id}
})
return NextResponse.json(DeleteThePart,{status:200})
}
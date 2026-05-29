import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id, text} = await req.json()
const editThePart = await prisma.templatesparts.update({
    where: {id:id,} ,data:{text:text}
})
return NextResponse.json(editThePart,{status:200})
}
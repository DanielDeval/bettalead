import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
 const {id} = await req.json()
 const gettheparts = await prisma.templatesparts.findMany({
    where : {TemplatesID:id}
 })
 return NextResponse.json(gettheparts,{status:200})
}
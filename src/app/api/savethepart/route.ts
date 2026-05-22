import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"



export const POST = async (req:Request) => {
    const {name, TemplatesID, place,text} = await req.json()
    const savepart = await prisma.templatesparts.create({
        data:{name:name,TemplatesID:TemplatesID,place:place,text:text}
    })
    return NextResponse.json(savepart,{status:200})
}
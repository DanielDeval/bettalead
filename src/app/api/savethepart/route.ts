import { encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"



export const POST = async (req:Request) => {
    const {name, TemplatesID, place,text} = await req.json()
    const encryptedname = encrypt(name)
    const encryptedplace = encrypt(place)
    const encryptedtext = encrypt(text)
    const savepart = await prisma.templatesparts.create({
        data:{name:encryptedname,TemplatesID:TemplatesID,place:encryptedplace,text:encryptedtext}
    })
    return NextResponse.json(savepart,{status:200})
}
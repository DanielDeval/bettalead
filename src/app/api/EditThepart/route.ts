import { decrypt, encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id, text} = await req.json()
const decryptedText = encrypt(text)
const editThePart = await prisma.templatesparts.update({
    where: {id:id,} ,data:{text:decryptedText}
})
return NextResponse.json(editThePart,{status:200})
}
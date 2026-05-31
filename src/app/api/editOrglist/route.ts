import { decrypt, encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id, text} = await req.json()
const enncryptedText = encrypt(text)
const editThePart = await prisma.organisationlist.updateMany({
    where: {OrgID:id,} ,data:{name:enncryptedText}
})
return NextResponse.json(editThePart,{status:200})
}
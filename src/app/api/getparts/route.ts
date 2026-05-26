import { decrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
 const {id} = await req.json()
 const gettheparts = await prisma.templatesparts.findMany({
    where : {TemplatesID:id}
 })
 for (const parts of gettheparts){
      parts.name = decrypt(parts.name);
      parts.place = decrypt(parts.place);
      parts.text = decrypt(parts.text);
 }
 return NextResponse.json(gettheparts,{status:200})
}
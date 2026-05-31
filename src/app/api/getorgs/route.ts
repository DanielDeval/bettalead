import { decrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    try{
    const {userID} = await req.json()
    const getOrgs = await prisma.organisationlist.findMany({
        where:{userID:userID}
    })
    for (const Org of getOrgs){
            Org.name = decrypt(Org.name);
            Org.status = decrypt(Org.status);
        }
    return NextResponse.json(getOrgs, {status:200})
    }catch(error){
    console.error(error)
    return NextResponse.json({ error: "No conection" },{status:500})
    }
}
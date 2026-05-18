import { Prisma } from "@/generated/prisma/client"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    try {
    const {formData , userID,orgID} = await req.json()
    const addToList = await prisma.organisationlist.create({
        data:{name:formData,status:"owner",userID:userID, OrgID:orgID}
    })
     return NextResponse.json(addToList,{status:200})
     }catch(error){
        return NextResponse.json({ error: "check conection" },{status:500})
     }
}
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    try{
    const {organisationID} = await req.json()
    const getCategory = await prisma.templates.findMany({
        where:{organisationID:organisationID}
    })
    return NextResponse.json(getCategory)
    }catch(error){
    console.error(error)
    return NextResponse.json({ error: "No conection" },{status:500})
    }
}
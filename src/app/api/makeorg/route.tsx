import {useSession} from "@/lib/auth-client"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req:Request) => {
    try{
const {formData, Username} = await req.json()
const makeorg = await prisma.organisation.create({
    data: {name:formData, owner:Username}
})
return NextResponse.json(makeorg,{status:200})
}
catch(error){
    console.error(error)
    return NextResponse.json({ error: "Name taken" },{status:500})
}
}
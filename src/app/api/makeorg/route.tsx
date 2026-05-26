import {useSession} from "@/lib/auth-client"
import { encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req:Request) => {
    try{
const {formData, Username} = await req.json()
const ecryptedformData = encrypt(formData)
const ecryptedUsername = encrypt(formData)
const makeorg = await prisma.organisation.create({
    data: {name:ecryptedformData, owner:ecryptedUsername}
})
return NextResponse.json(makeorg,{status:200})
}
catch(error){
    console.error(error)
    return NextResponse.json({ error: "Name taken" },{status:500})
}
}
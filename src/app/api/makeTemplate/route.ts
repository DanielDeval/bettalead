



import {useSession} from "@/lib/auth-client"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req:Request) => {
    try{
const {name,category,intro,Introduction,Offer,Porfolio,Outro,Links,organisationID} = await req.json()
const makeorg = await prisma.templates.create({
    data: {name:name, category:category, intro:intro, Introduction:Introduction, Offer:Offer, Porfolio:Porfolio, Outro:Outro, Links:Links, 
        organisationID:organisationID}
})
return NextResponse.json(makeorg,{status:200})
}
catch(error){
    console.error(error)
    return NextResponse.json({ error: "No conection" },{status:500})
}
}
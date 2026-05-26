



import {useSession} from "@/lib/auth-client"
import { encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req:Request) => {
    try{
const {name,category,intro,Introduction,Offer,Porfolio,Outro,Links,organisationID} = await req.json()
const ecryptedname = encrypt(name)
const ecryptedcategory = encrypt(category)
const ecryptedintro = encrypt(intro)
const ecryptedIntroduction = encrypt(Introduction)
const ecryptedOffer = encrypt(Offer)
const ecryptedPorfolio = encrypt(Porfolio)
const ecryptedOutro = encrypt(Outro)
const ecryptedLinks = encrypt(Links)
const makeorg = await prisma.templates.create({
    data: {name:ecryptedname, category:ecryptedcategory, intro:ecryptedintro, Introduction:ecryptedIntroduction, Offer:ecryptedOffer,
         Porfolio:ecryptedPorfolio, Outro:ecryptedOutro, Links:ecryptedLinks, 
        organisationID:organisationID}
})
return NextResponse.json(makeorg,{status:200})
}
catch(error){
    console.error(error)
    return NextResponse.json({ error: "No conection" },{status:500})
}
}
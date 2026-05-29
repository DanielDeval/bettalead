import { decrypt, encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async (req:Request) => {
const {id, name, intro, introduction,offer,portfolio,outro,links} = await req.json()
const decryptedname = encrypt(name)
const decryptedintro = encrypt(intro)
const decryptedintroduction = encrypt(introduction)
const decryptedoffer = encrypt(offer)
const decryptedportfolio = encrypt(portfolio)
const decryptedoutro = encrypt(outro)
const decryptedlinks = encrypt(links)
const editThePart = await prisma.templates.update({
    where: {id:id,} ,data:{
                            name:decryptedname,
                            intro:decryptedintro,
                            Introduction:decryptedintroduction,
                            Offer:decryptedoffer,
                            Porfolio:decryptedportfolio,
                            Outro:decryptedoutro,
                            Links:decryptedlinks,
    }
})
return NextResponse.json(editThePart,{status:200})
}
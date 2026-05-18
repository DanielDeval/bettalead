import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async(req:Request) => {
    const {name, companyname, email, number, personaliseddata, jobdecriction, services, type, link, website,organisationID} = await req.json()
    const saveContact = await prisma.contacts.create({
        data:{name, companyname, email, number, personaliseddata, jobdecriction, services, type, link, website,organisationID, contacted:false, contacteddate:new Date()}
    })
    return NextResponse.json(saveContact,{status:200})
    

}
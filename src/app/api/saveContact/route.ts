import { encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const POST = async(req:Request) => {
    const {name, companyname, email, number, personaliseddata, jobdecriction, services, type, link, website,organisationID} = await req.json()
    const encryptedname = encrypt(name)
    const encryptedcompanyname = encrypt(companyname)
    const encryptedemail = encrypt(email)
    const encryptednumber = encrypt(number)
    const encryptedpersonaliseddata = encrypt(personaliseddata)
    const encryptedjobdecriction = encrypt(jobdecriction)
    const encryptedservices = encrypt(services)
    const encryptedtype = encrypt(type)
    const encryptedlink = encrypt(link)
    const encryptedwebsite = encrypt(website)
    const saveContact = await prisma.contacts.create({
        data:{name:encryptedname, companyname:encryptedcompanyname, email:encryptedemail, number:encryptednumber,
            personaliseddata:encryptedpersonaliseddata
            ,jobdecriction:encryptedjobdecriction, services:encryptedservices, type:encryptedtype, link:encryptedlink, website:
            encryptedwebsite,organisationID, contacted:false, contacteddate:new Date()}
    })
    return NextResponse.json(saveContact,{status:200})
    

}

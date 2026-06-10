import { encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"






export const POST = async (req:Request) => {
const {id,companyname,number,email,personaliseddata,jobdecriction,services,type,location,website,link} = await req.json()
const encrptcompanyname = encrypt(companyname)
const encrptnumber = encrypt(number)
const encrptemail = encrypt(email)
const encrptpersonaliseddata = encrypt(personaliseddata)
const encrptjobdecriction = encrypt(jobdecriction)
const encrptservices = encrypt(services)
const encrpttype = encrypt(type)
const encryptedlocation = encrypt(location)
const encrptwebsite = encrypt(website)
const encrptlink = encrypt(link)
const editthecontact = await prisma.contacts.update({
    where:{id,},
    data:{companyname:encrptcompanyname,
          number:encrptnumber,
          email:encrptemail,
          personaliseddata:encrptpersonaliseddata,
          jobdecriction:encrptjobdecriction,
          services:encrptservices,
          type:encrpttype,
          website:encrptwebsite,
          link:encrptlink,
    }
})
return NextResponse.json(editthecontact,{status:200})
}
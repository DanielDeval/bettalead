import { decrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    const {orgID} = await req.json()
    const contacts = await prisma.contacts.findMany(
       { where: {organisationID:orgID,
        contacted: false
       }}
       
    )
     for (const contact of contacts){
        contact.name = decrypt(contact.name);
        contact.companyname = decrypt(contact.companyname);
        contact.email = decrypt(contact.email);
        contact.number = decrypt(contact.number);
        contact.personaliseddata = decrypt(contact.personaliseddata);
        contact.jobdecriction = decrypt(contact.jobdecriction);
        contact.services = decrypt(contact.services);
        contact.type = decrypt(contact.type);
        contact.link = decrypt(contact.link);
        contact.website = decrypt(contact.website);
     }
    return NextResponse.json(contacts,{status:200})
}
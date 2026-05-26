import { decrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export const POST = async (req:Request) => {
    try{
    const {organisationID} = await req.json()
    const getCategory = await prisma.templates.findMany({
        where:{organisationID:organisationID}
    })
    for (const Category of getCategory){
        Category.name = decrypt(Category.name);
        Category.category = decrypt(Category.category);
        Category.intro = decrypt(Category.intro);
        Category.Introduction = decrypt(Category.Introduction);
        Category.Offer = decrypt(Category.Offer);
        Category.Porfolio = decrypt(Category.Porfolio);
        Category.Outro = decrypt(Category.Outro);
        Category.Links = decrypt(Category.Links);
    }
    return NextResponse.json(getCategory)
    }catch(error){
    console.error(error)
    return NextResponse.json({ error: "No conection" },{status:500})
    }
}
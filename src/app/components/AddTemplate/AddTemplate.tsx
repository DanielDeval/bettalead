"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Organisationlist, Templates } from '@/generated/prisma/client';
import "@/styles//AddTemplate/AddTemplate.css"

const AddTemplate = () => {


const { data: session } = useSession();








/*///////////////////////////////////////////////////////////////////form handlers//////////////////////////////////////////////////////////////*/

const [formdata, setFormdata] = useState({
  name: "",
  category:"",
  intro:"",
  Introduction:"",
  Offer:"",
  Porfolio:"",
  Outro:"",
  Links:"",
  text:"",
  organisationID:"",
})
/*///////////////////////////////////////////////////////////////////form handlers//////////////////////////////////////////////////////////////*/


/*///////////////////////////////////////////////////////////////////Get Orgs/////////////////////////////////////////////////////////////////*/

const [orgs, setOrgs] = useState<Organisationlist[]>([])



useEffect(() => {
  const getOrgs = async () => {
    const goGetTheOrgs = await fetch("/api/getorgs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: session?.user.id })
    })

    const data = await goGetTheOrgs.json()
    setOrgs(data)
  }

  if (session?.user?.id) {
    getOrgs()
  }
}, [session?.user?.id])


/*///////////////////////////////////////////////////////////////////Get Orgs/////////////////////////////////////////////////////////////////*/



/*///////////////////////////////////////////////////////////////////Get Catagories///////////////////////////////////////////////////////////*/


const [categories, setCategories] = useState<Templates[]>([])

const CatagoryValue = {Value:""}


const getCategory = async () =>{
  const getTheCategory = await fetch("/api/getCategory",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({organisationID:CatagoryValue.Value})
    })
    const data = await getTheCategory.json()
    setCategories(data)
}



/*///////////////////////////////////////////////////////////////////Get Catagories///////////////////////////////////////////////////////////*/



/*///////////////////////////////////////////////////////////////////Make Template///////////////////////////////////////////////////////////*/

const [namenew, setMakenew] = useState(false)

const MakeTemplate = async () => {
  const MakeTheTemplate = await fetch("/api/makeTemplate",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
                              name:formdata.name,
                              category:formdata.category,
                              intro:formdata.intro,
                              Introduction:formdata.Introduction,
                             Offer:formdata.Offer,
                              Porfolio:formdata.Porfolio,
                             Outro :formdata.Outro,
                              Links:formdata.Links,
                              organisationID:formdata.organisationID,
                            })
    })
    const data = await MakeTheTemplate.json()
    
} 



/*///////////////////////////////////////////////////////////////////Make Template///////////////////////////////////////////////////////////*/


  return (
    <div className='AddTemplateWrapper'><div className='AddTemplate'>
        <input placeholder='name' required value={formdata.name} onChange={(e)=>{setFormdata({...formdata,name:e.target.value})}}></input>
        <select  value={formdata.organisationID} onChange={(e)=>{setFormdata({...formdata,organisationID:e.target.value});
                                                              CatagoryValue.Value = e.target.value;
                                                               getCategory() }}>
          <option value="" disabled hidden>
                  Select Orginization
                </option>
          {orgs.map((org) => (
          <option key={org.id} value={org.OrgID}>
            {org.name}
          </option>
        ))}
        </select>
        <select value={formdata.category} onChange={(e)=>{
                                                          if(e.target.value === "create"){ setMakenew(true)}
                                                          else{ setFormdata({...formdata,category:e.target.value})}}}>
          <option value="" disabled hidden>
                  Select Catagory
          </option>
          <option value="create">create</option>
          {categories.map((category) => (
          <option key={category.category} value={category.category}>
            {category.category}
          </option>
        ))}
        </select>
        {namenew && <input type='text' placeholder='create new category' onChange={(e)=>{setFormdata({...formdata,category:e.target.value})}}></input>}
        <textarea required placeholder='intro'  value={formdata.intro} onChange={(e)=>{setFormdata({...formdata,intro:e.target.value})}}>intro</textarea>
        <textarea required placeholder='Introduction'  value={formdata.Introduction} onChange={(e)=>{setFormdata({...formdata,Introduction:e.target.value})}}>Introduction</textarea>
        <textarea required placeholder='Offer' value={formdata.Offer} onChange={(e)=>{setFormdata({...formdata,Offer:e.target.value})}}>Offer</textarea>
        <textarea required placeholder='Porfolio' value={formdata.Porfolio} onChange={(e)=>{setFormdata({...formdata,Porfolio:e.target.value})}}>Porfolio</textarea>
        <textarea required placeholder='Outro' value={formdata.Outro} onChange={(e)=>{setFormdata({...formdata,Outro:e.target.value})}}>Outro</textarea>
        <textarea required placeholder='Links' value={formdata.Links} onChange={(e)=>{setFormdata({...formdata,Links:e.target.value})}}>Links</textarea>
        <button onClick={()=>{MakeTemplate()}}>make Template</button>
    </div></div>
  )
}

export default AddTemplate
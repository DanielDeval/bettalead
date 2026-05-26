"use client"
import { Organisationlist } from '@/generated/prisma/client'
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react'
import "@/styles/Savecontact/Savecontact.css"


const Savecontact = () => {

const { data: session } = useSession();


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




const [formdata, setFormdata ] = useState({
  name:"",
  companyname:"",
  email:"",
  number:"",
  personaliseddata:"",
  jobdecriction:"",
  services:"",
  type:"",
  link:"",
  website:"",
  organisationID:"",
})

const saveContect = async () => {
  const savingContact = await fetch("api/saveContact",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({name : formdata.name,
                        companyname:formdata.companyname,
                        email:formdata.email,
                        number:formdata.number,
                        personaliseddata:formdata.personaliseddata,
                        jobdecriction:formdata.jobdecriction,
                        services:formdata.services,
                        type:formdata.type,
                        link:formdata.link,
                        website:formdata.website,
                        organisationID:formdata.organisationID,
    })
  })
  const savedContact = await savingContact.json()
  if(savingContact.ok){
    setFormdata((prev)=>({...prev,
                         name:"",
                        companyname:"",
                        email:"",
                        number:"",
                        personaliseddata:"",
                        jobdecriction:"",
                        services:"",
                        type:"",
                        link:"",
                        website:"", 
  }))
  }
  
}


  return (
    <div className='SavecontactWrapper'><div  className='Savecontact'>
        <select  value={formdata.organisationID} onChange={(e)=>{setFormdata({...formdata,organisationID:e.target.value});}}>
          <option value="" disabled hidden>
                  Select Orginization
                </option>
          {orgs.map((org) => (
          <option key={org.id} value={org.OrgID}>
            {org.name}
          </option>
        ))}
        </select>
        <input placeholder='name' type='text' value={formdata.name} onChange={(e)=>{setFormdata({...formdata,name: e.target.value})}}/>
        <input placeholder='companyname' type='text'value={formdata.companyname} onChange={(e)=>{setFormdata({...formdata,companyname: e.target.value})}}/>
        <input placeholder='email' type='text'value={formdata.email} onChange={(e)=>{setFormdata({...formdata,email: e.target.value})}}/>
        <input placeholder='number' type='text'value={formdata.number} onChange={(e)=>{setFormdata({...formdata,number: e.target.value})}}/>
        <textarea placeholder='personaliseddata' value={formdata.personaliseddata} onChange={(e)=>{setFormdata({...formdata,personaliseddata: e.target.value})}}/>
        <textarea placeholder='jobdecriction' value={formdata.jobdecriction} onChange={(e)=>{setFormdata({...formdata,jobdecriction: e.target.value})}}/>
        <input placeholder='services' type='text'value={formdata.services} onChange={(e)=>{setFormdata({...formdata,services: e.target.value})}}/>
        <input placeholder='type' type='text'value={formdata.type} onChange={(e)=>{setFormdata({...formdata,type: e.target.value})}}/>
        <input placeholder='link' type='text'value={formdata.link} onChange={(e)=>{setFormdata({...formdata,link: e.target.value})}}/>
        <input placeholder='website' type='text'value={formdata.website} onChange={(e)=>{setFormdata({...formdata,website: e.target.value})}}/>
        <button onClick={()=>{saveContect()}}>Save</button>
    </div></div>
  )
}

export default Savecontact
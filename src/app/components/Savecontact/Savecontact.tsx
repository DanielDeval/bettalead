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
  location:"",
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
                        location:formdata.location,
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
                        location:"",
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
        <input placeholder='Company name' type='text' value={formdata.name} onChange={(e)=>{setFormdata({...formdata,name: e.target.value})}}/>
        <input placeholder='Name on the email' type='text'value={formdata.companyname} onChange={(e)=>{setFormdata({...formdata,companyname: e.target.value})}}/>
        <input placeholder='Email address' type='text'value={formdata.email} onChange={(e)=>{setFormdata({...formdata,email: e.target.value})}}/>
        <input placeholder='Contact number' type='text'value={formdata.number} onChange={(e)=>{setFormdata({...formdata,number: e.target.value})}}/>
        <textarea placeholder='Company data' value={formdata.personaliseddata} onChange={(e)=>{setFormdata({...formdata,personaliseddata: e.target.value})}}/>
        <textarea placeholder='Job description' value={formdata.jobdecriction} onChange={(e)=>{setFormdata({...formdata,jobdecriction: e.target.value})}}/>
        <input placeholder='Services to offer' type='text'value={formdata.services} onChange={(e)=>{setFormdata({...formdata,services: e.target.value})}}/>
        <input placeholder='Company type' type='text'value={formdata.type} onChange={(e)=>{setFormdata({...formdata,type: e.target.value})}}/>
        <input placeholder='Company location' type='text'value={formdata.location} onChange={(e)=>{setFormdata({...formdata,location: e.target.value})}}/>
        <input placeholder='Website' type='text'value={formdata.website} onChange={(e)=>{setFormdata({...formdata,website: e.target.value})}}/>
        <input placeholder='Additional links' type='text'value={formdata.link} onChange={(e)=>{setFormdata({...formdata,link: e.target.value})}}/>
        <button onClick={()=>{saveContect()}}>Save</button>
    </div></div>
  )
}

export default Savecontact
"use client"
import { Organisationlist } from '@/generated/prisma/client'
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react'


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
}


  return (
    <div>
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
        <input type='text' value={formdata.name} onChange={(e)=>{setFormdata({...formdata,name: e.target.value})}}/>name
        <input type='text'value={formdata.companyname} onChange={(e)=>{setFormdata({...formdata,companyname: e.target.value})}}/>companyname
        <input type='text'value={formdata.email} onChange={(e)=>{setFormdata({...formdata,email: e.target.value})}}/>email
        <input type='text'value={formdata.number} onChange={(e)=>{setFormdata({...formdata,number: e.target.value})}}/>number
        <input type='text'value={formdata.personaliseddata} onChange={(e)=>{setFormdata({...formdata,personaliseddata: e.target.value})}}/>personaliseddata
        <input type='text'value={formdata.jobdecriction} onChange={(e)=>{setFormdata({...formdata,jobdecriction: e.target.value})}}/>jobdecriction
        <input type='text'value={formdata.services} onChange={(e)=>{setFormdata({...formdata,services: e.target.value})}}/>services
        <input type='text'value={formdata.type} onChange={(e)=>{setFormdata({...formdata,type: e.target.value})}}/>type
        <input type='text'value={formdata.link} onChange={(e)=>{setFormdata({...formdata,link: e.target.value})}}/>link
        <input type='text'value={formdata.website} onChange={(e)=>{setFormdata({...formdata,website: e.target.value})}}/>website
        <button onClick={()=>{saveContect()}}>Save</button>
    </div>
  )
}

export default Savecontact
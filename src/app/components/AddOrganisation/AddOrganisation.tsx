"use client"
import { useSession } from '@/lib/auth-client';
import { error } from 'console';
import React, { useState } from 'react'
import "@/styles/AddOrganisation/AddOrganisation.css"





const AddOrganisation = () => {


const { data: session } = useSession();


const [formData, setFormdata] = useState("")

const [errormessage, setErrormessage] = useState("")

const submitForm = async () => {
 try{
  const Form = await fetch("/api/makeorg",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({formData,Username:session?.user.name})
  })
const makeorg = await Form.json()

if(Form.ok){
    const lastlocalorg = await fetch("/api/addorg",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({formData,userID:session?.user.id,orgID:makeorg.id})
  })
  const makeorg2 = await lastlocalorg.json()
    if(lastlocalorg.ok){
      setErrormessage("it worked")
      setFormdata("")
    }

  }}catch(error){
    setErrormessage(String(error))
  }
}



  return (
    <div className='AddOrganisationWrapper'><div className='AddOrganisation'>
        <input value={formData} className='AddOrganisationinput' type='text' placeholder='Organisation' onChange={(e)=>{setFormdata(e.target.value)}}></input>
        <button  className='AddOrganisationbutton' onClick={()=>{submitForm()}}>Submit</button>
        <p>{errormessage}</p>
    </div></div>
  )
}

export default AddOrganisation
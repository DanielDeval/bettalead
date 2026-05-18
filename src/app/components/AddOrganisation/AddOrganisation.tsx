"use client"
import { useSession } from '@/lib/auth-client';
import { error } from 'console';
import React, { useState } from 'react'





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
    }

  }}catch(error){
    setErrormessage(String(error))
  }
}



  return (
    <div><div>
        <input type='text' placeholder='Organisation' onChange={(e)=>{setFormdata(e.target.value)}}></input>
        <button onClick={()=>{submitForm()}}>Submit</button>
        <p>{errormessage}</p>
    </div></div>
  )
}

export default AddOrganisation
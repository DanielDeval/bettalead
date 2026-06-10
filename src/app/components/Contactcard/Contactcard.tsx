import { Contacts } from '@/generated/prisma/client'
import React, { useState } from 'react'
import "@/styles/Contactcard/Contactcard.css"




type Contacttype = {
    contact: Contacts
    setorgID:(input:string)=>void
    setContactname:(input:string)=>void
    handleemailmode:(input:boolean)=>void
    setContactemail:(input:string)=>void
    setContactcompanyID:(input:string)=>void
    editcontact:(id:string,companyname:string,number:string,email:string,
                            personaliseddata:string,jobdecriction:string,services:string,
                            type:string,website:string,link:string)=>void
    
}




const Contactcard = ({contact,setorgID,setContactname,handleemailmode,setContactemail,setContactcompanyID,editcontact}:Contacttype) => {


/*///////////////////////////////////////////////////////////////////expand control/////////////////////////////////////////////////////////////*/


const [localstate, setLocalstate] = useState("")

const handlelocalstate = (input:string) => {
    setLocalstate(input)
}

/*///////////////////////////////////////////////////////////////////expand control/////////////////////////////////////////////////////////////*/

/*///////////////////////////////////////////////////////////////////contact control/////////////////////////////////////////////////////////////*/


const handleContact = () => {
setorgID(contact.organisationID)
setContactname(contact.companyname)
setContactemail(contact.email)
setContactcompanyID(contact.id)
}


/*///////////////////////////////////////////////////////////////////contact control////////////////////////////////////////////////////////*/

/*///////////////////////////////////////////////////////////////////local contact handler ////////////////////////////////////////////////*/

const [localcontact, setLocalcontact] = useState({
        companyname:"",
        number:"",
        email:"",
        personaliseddata:"",
        jobdecriction:"",
        services:"",
        type:"",
        website:"",
        link:"",
})

const handleStartEdit = () => {
  setLocalcontact({
    companyname:contact.companyname,
        number:contact.number,
        email:contact.email,
        personaliseddata:contact.personaliseddata,
        jobdecriction:contact.jobdecriction,
        services:contact.services,
        type:contact.type,
        website:contact.website,
        link:contact.link,
  })
  handlelocalstate("edit")
  
}


/*///////////////////////////////////////////////////////////////////local contact handler ////////////////////////////////////////////////*/


/*///////////////////////////////////////////////////////////////////edit contact handler ////////////////////////////////////////////////*/

const Contacteditor = async () => {
  const editContact = await fetch("/api/editcontact",{
    method:"POST",
    headers:{"Contact-Type":"application/json"},
      body:JSON.stringify({id:contact.id,companyname:localcontact.companyname,number:localcontact.number,email:localcontact.email,
                            personaliseddata:localcontact.personaliseddata,jobdecriction:localcontact.jobdecriction,services:localcontact.services,
                            type:localcontact.type,website:localcontact.website,link:localcontact.link})
    
  })
  const data = await editContact.json()
  if(editContact.ok){
    handlelocalstate("")
    editcontact(contact.id,localcontact.companyname,localcontact.number,localcontact.email,
                            localcontact.personaliseddata,localcontact.jobdecriction,localcontact.services,
                            localcontact.type,localcontact.website,localcontact.link)
  }
}

/*///////////////////////////////////////////////////////////////////edit contact handler ////////////////////////////////////////////////*/




  return (
    <div className='scrollwrapper'>
      {localstate === "" && <div>
        <h1>{contact.name}</h1>
        <button onClick={() => handlelocalstate("expand")}>Expand</button>
        <button onClick={() => {handleContact();
                          handleemailmode(true)
        }}>Contact</button>
    </div>}
      {localstate === "expand" && <div>
        <h1>{contact.name}</h1>
        <h1>{contact.companyname}</h1>
        <p>{contact.number}</p>
        <p>{contact.email}</p>
        <p>{contact.personaliseddata}</p>
        <p>{contact.jobdecriction}</p>
        <p>{contact.services}</p>
        <p>{contact.type}</p>
        <p>{contact.website}</p>
        <p>{contact.link}</p>
        <button onClick={()=>{handleStartEdit()}}>Edit contact</button>
        <button onClick={() => handlelocalstate("")}>Close</button>
        <button onClick={() => {handleContact();
                          handleemailmode(true)
        }}>Contact</button>
    </div>}
    {localstate === "edit" && 
    <div>
      <h1>{contact.name}</h1>
      <h1>{contact.companyname}</h1>
      <input value={localcontact.companyname} onChange={(e)=>{setLocalcontact((prev)=>({...prev,companyname:e.target.value}))}}></input>
        <input value={localcontact.number} onChange={(e)=>{setLocalcontact((prev)=>({...prev,number:e.target.value}))}}></input>
        <input value={localcontact.email} onChange={(e)=>{setLocalcontact((prev)=>({...prev,email:e.target.value}))}}></input>
        <textarea value={localcontact.personaliseddata} onChange={(e)=>{setLocalcontact((prev)=>({...prev,personaliseddata:e.target.value}))}}></textarea>
        <textarea value={localcontact.jobdecriction} onChange={(e)=>{setLocalcontact((prev)=>({...prev,jobdecriction:e.target.value}))}}></textarea>
        <textarea value={localcontact.services} onChange={(e)=>{setLocalcontact((prev)=>({...prev,services:e.target.value}))}}></textarea>
        <textarea value={localcontact.type} onChange={(e)=>{setLocalcontact((prev)=>({...prev,type:e.target.value}))}}></textarea>
        <textarea value={localcontact.website} onChange={(e)=>{setLocalcontact((prev)=>({...prev,website:e.target.value}))}}></textarea>
        <textarea value={localcontact.link} onChange={(e)=>{setLocalcontact((prev)=>({...prev,link:e.target.value}))}}></textarea>
        <button onClick={() => Contacteditor()}>Save</button>
        <button onClick={() => handlelocalstate("")}>Close</button>
    </div>}

    </div>
  )
}

export default Contactcard
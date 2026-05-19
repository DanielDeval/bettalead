"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Contacts, Organisationlist } from '@/generated/prisma/client';
import Contact from '../Contact/Contact';
import Contactcard from '../Contactcard/Contactcard';

const Contactlist = () => {




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




/*///////////////////////////////////////////////////////////////////local State/////////////////////////////////////////////////////////////*/

const [localstate, setLocalstate] = useState({
    orgID: "",
    Contactname:"",
})

/*///////////////////////////////////////////////////////////////////local State/////////////////////////////////////////////////////////////*/

/*///////////////////////////////////////////////////////////////////get Contacts/////////////////////////////////////////////////////////////*/


const [contacts, setContacts] = useState<Contacts[]>([])
const fastorgid = {name:''}


const getTheContacts = async () => {
    const GoGetTheContacts = await fetch("api",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(fastorgid.name)
    })
    const data = await GoGetTheContacts.json()
    setContacts(data)
    
}


const setorgid = (value:string) =>{
    fastorgid.name = value
}


/*///////////////////////////////////////////////////////////////////get Contacts/////////////////////////////////////////////////////////////*/









  return (
    <div>
        <select  value={localstate.orgID} onChange={(e)=>{setLocalstate({...localstate,orgID:e.target.value});
                                                          setorgid(e.target.value)
                                                          getTheContacts()}}>
          <option value="" disabled hidden>
                  Select Orginization
                </option>
          {orgs.map((org) => (
          <option key={org.id} value={org.OrgID}>
            {org.name}
          </option>
        ))}
        </select>
        {contacts.map((contact) => (
            <Contactcard key={contact.id} contact={contact}/>
        ) )}

    </div>
  )
}

export default Contactlist
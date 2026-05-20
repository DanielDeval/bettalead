"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Contacts, Organisationlist } from '@/generated/prisma/client';
import Contactlist from '../Contactlist/Contactlist';
import Emailmaker from '../Emailmaker/Emailmaker';




const Contact = () => {


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

const setorgID = (input:string) => {
setLocalstate(prev => ({ ...prev, orgID: input }))
}

const setContactname = (input:string) => {
setLocalstate(prev => ({ ...prev, Contactname: input }))
}

/*///////////////////////////////////////////////////////////////////local State/////////////////////////////////////////////////////////////*/


/*///////////////////////////////////////////////////////////////////get Contacts/////////////////////////////////////////////////////////////*/


const [contacts, setContacts] = useState<Contacts[]>([])



const getTheContacts = async (selected:string) => {
    const GoGetTheContacts = await fetch("api/getuncontactedcontacts",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(selected)
    })
    const data = await GoGetTheContacts.json()
    setContacts(data)
    
}



/*///////////////////////////////////////////////////////////////////get Contacts/////////////////////////////////////////////////////////////*/

/*///////////////////////////////////////////////////////////////////mode state///////////////////////////////////////////////////////////////*/

    const [emailmode, setEmailmode] = useState(false)

const handleemailmode = (input:boolean) => {
    setEmailmode(input)
}

/*///////////////////////////////////////////////////////////////////mode state///////////////////////////////////////////////////////////////*/


  return (
    <div>
        {!emailmode && <Contactlist handleemailmode={handleemailmode}
                                     orgs={orgs} localstate={localstate}
                                     getTheContacts={getTheContacts}
                                     contacts={contacts} setorgID={setorgID}
                                     setContactname={setContactname}/>}
        {emailmode && <Emailmaker handleemailmode={handleemailmode} localstate={localstate}/>}
        
    </div>
  )
}

export default Contact
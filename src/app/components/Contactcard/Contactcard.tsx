import { Contacts } from '@/generated/prisma/client'
import React, { useState } from 'react'




type Contacttype = {
    contact: Contacts
    setorgID:(input:string)=>void
    setContactname:(input:string)=>void
    handleemailmode:(input:boolean)=>void
}


const Contactcard = ({contact,setorgID,setContactname,handleemailmode}:Contacttype) => {


/*///////////////////////////////////////////////////////////////////expand control/////////////////////////////////////////////////////////////*/


const [localstate, setLocalstate] = useState(false)

const handlelocalstate = () => {
    setLocalstate(prev => !prev)
}

/*///////////////////////////////////////////////////////////////////expand control/////////////////////////////////////////////////////////////*/

/*///////////////////////////////////////////////////////////////////contact control/////////////////////////////////////////////////////////////*/


const handleContact = () => {
setorgID(contact.organisationID)
setContactname(contact.name)
}


/*///////////////////////////////////////////////////////////////////contact control/////////////////////////////////////////////////////////////*/




  return (
    <div>
        <h1>{contact.name}</h1>
        <button onClick={() => handlelocalstate()}>expand</button>
        <button onClick={() => {handleContact();
                          handleemailmode(true)
        }}>contact</button>
    </div>
  )
}

export default Contactcard
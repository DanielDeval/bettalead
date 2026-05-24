import { Contacts } from '@/generated/prisma/client'
import React, { useState } from 'react'




type Contacttype = {
    contact: Contacts
    setorgID:(input:string)=>void
    setContactname:(input:string)=>void
    handleemailmode:(input:boolean)=>void
    setContactemail:(input:string)=>void
}


const Contactcard = ({contact,setorgID,setContactname,handleemailmode,setContactemail}:Contacttype) => {


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
setContactemail(contact.email)
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
import { Contacts } from '@/generated/prisma/client'
import React, { useState } from 'react'




type Contacttype = {
    contact: Contacts
    setorgID:(input:string)=>void
    setContactname:(input:string)=>void
    handleemailmode:(input:boolean)=>void
    setContactemail:(input:string)=>void
    setContactcompanyID:(input:string)=>void
}


const Contactcard = ({contact,setorgID,setContactname,handleemailmode,setContactemail,setContactcompanyID}:Contacttype) => {


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
setContactcompanyID(contact.id)
}


/*///////////////////////////////////////////////////////////////////contact control/////////////////////////////////////////////////////////////*/




  return (
    <div>
      {localstate && <div>
        <h1>{contact.name}</h1>
        <p>{contact.number}</p>
        <p>{contact.email}</p>
        <p>{contact.personaliseddata}</p>
        <p>{contact.jobdecriction}</p>
        <p>{contact.services}</p>
        <p>{contact.type}</p>
        <p>{contact.link}</p>
        <p>{contact.website}</p>
        <button onClick={() => handlelocalstate()}>expand</button>
        <button onClick={() => {handleContact();
                          handleemailmode(true)
        }}>contact</button>
    </div>}
    {!localstate && <div>
        <h1>{contact.name}</h1>
        <button onClick={() => handlelocalstate()}>expand</button>
        <button onClick={() => {handleContact();
                          handleemailmode(true)
        }}>contact</button>
    </div>}
    
    
    </div>
  )
}

export default Contactcard
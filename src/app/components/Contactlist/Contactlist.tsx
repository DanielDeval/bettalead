"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Contacts, Organisationlist } from '@/generated/prisma/client';
import Contact from '../Contact/Contact';
import Contactcard from '../Contactcard/Contactcard';
import "@/styles/Contactlist/Contactlist.css"


type Contactlisttype = {
    handleemailmode:(input:boolean)=>void
    orgs:Organisationlist[]
    localstate:{orgID:string,Contactname:string,companyID:string}
    getTheContacts:(selected:string)=>void
    contacts:Contacts[]
    setorgID:(input:string)=>void
    setContactname:(input:string)=>void
    setContactemail:(input:string)=>void
    setContactcompanyID:(input:string)=>void
    editcontact:(id:string,companyname:string,number:string,email:string,
                            personaliseddata:string,jobdecriction:string,services:string,
                            type:string,location:string,website:string,link:string)=>void
}

const Contactlist = ({handleemailmode,orgs,localstate,getTheContacts,contacts,setorgID,setContactname,setContactemail,setContactcompanyID,editcontact}:Contactlisttype) => {



const [localeststate, setLocaleststate] = useState("")

const [locations, setLlocations] = useState("")


/*///////////////////////////////////////////////////////////////////sort Contacts/////////////////////////////////////////////////////////////*/

const contactLocations = [...new Set(contacts.map(contact => contact.location))]

const [sortedcontacts, setSortedcontacts] = useState<Contacts[]>([])


const sortcontacts = (input:string) => {
if(input === ""){
  setSortedcontacts(contacts)
}
else{
  setSortedcontacts(contacts.filter(contact => contact.location === input));
}
}

/*///////////////////////////////////////////////////////////////////sort Contacts/////////////////////////////////////////////////////////////*/


  return (
    <div className='ContactlistWrapper'><div className='Contactlist'>
        <select className='Contactlistselect'  value={localstate.orgID} onChange={(e)=>{sortcontacts("");getTheContacts(e.target.value);setLocaleststate(e.target.value);setorgID(e.target.value)}}>
          <option className='Contactlistoption' value="" disabled hidden>
                  Select Orginization
                </option>
          {orgs.map((org) => (
          <option className='Contactlistoption' key={org.id} value={org.OrgID}>
            {org.name}
          </option>
        ))}
        </select>
        <select className='Contactlistselect'  value={locations} onChange={(e)=>{sortcontacts(e.target.value);setLocaleststate(e.target.value);}}>
          <option className='Contactlistoption' value="" disabled hidden>
                  Sort by locations
                </option>
          {contactLocations.map((contactLocation) => (
          <option className='Contactlistoption' key={contactLocation} value={contactLocation}>
            {contactLocation}
          </option>
        ))}
          
          </select>
        {sortedcontacts.map((contact) => (
            <Contactcard key={contact.id}
            contact={contact}
            setorgID={setorgID}
            setContactname={setContactname}
            handleemailmode={handleemailmode}
            setContactemail={setContactemail}
            setContactcompanyID={setContactcompanyID}
            editcontact={editcontact}/>
        ) )}

    </div></div>
  )
}

export default Contactlist
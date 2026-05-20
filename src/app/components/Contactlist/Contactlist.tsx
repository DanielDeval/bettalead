"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Contacts, Organisationlist } from '@/generated/prisma/client';
import Contact from '../Contact/Contact';
import Contactcard from '../Contactcard/Contactcard';


type Contactlisttype = {
    handleemailmode:(input:boolean)=>void
    orgs:Organisationlist[]
    localstate:{orgID:string,Contactname:string}
    getTheContacts:(selected:string)=>void
    contacts:Contacts[]
    setorgID:(input:string)=>void
    setContactname:(input:string)=>void
}

const Contactlist = ({handleemailmode,orgs,localstate,getTheContacts,contacts,setorgID,setContactname}:Contactlisttype) => {






  return (
    <div>
        <select  value={localstate.orgID} onChange={(e)=>{getTheContacts(e.target.value);}}>
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
            <Contactcard key={contact.id} contact={contact} setorgID={setorgID} setContactname={setContactname} handleemailmode={handleemailmode}/>
        ) )}

    </div>
  )
}

export default Contactlist
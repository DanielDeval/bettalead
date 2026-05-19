"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Contacts, Organisationlist } from '@/generated/prisma/client';
import Contactlist from '../Contactlist/Contactlist';
import Emailmaker from '../Emailmaker/Emailmaker';




const Contact = () => {

/*///////////////////////////////////////////////////////////////////mode state///////////////////////////////////////////////////////////////*/

    const [emailmode, setEmailmode] = useState(false)

const handleemailmode = (input:boolean) => {
    setEmailmode(input)
}

/*///////////////////////////////////////////////////////////////////mode state///////////////////////////////////////////////////////////////*/


  return (
    <div>
        {!emailmode && <Contactlist/>}
        {emailmode && <Emailmaker/>}
        
    </div>
  )
}

export default Contact
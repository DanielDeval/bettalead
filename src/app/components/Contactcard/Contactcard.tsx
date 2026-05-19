import { Contacts } from '@/generated/prisma/client'
import React from 'react'




type Contacttype = {
    contact: Contacts
}


const Contactcard = ({contact}:Contacttype) => {




  return (
    <div>Contactcard</div>
  )
}

export default Contactcard
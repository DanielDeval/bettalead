"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from "@/lib/auth-client"
import { Organisationlist } from '@/generated/prisma/client';
import "@/styles/ManageOrg/ManageOrg.css"

const ManageOrg = () => {

    const { data: session } = useSession();



    /*///////////////////////////////////////////////////////////////////dropdowndata/////////////////////////////////////////////////////////*/

    const [selectorg, setSelectorg] = useState("") 

    const [selectfunc, setSelectfunc] = useState("") 

     const [name, setName] = useState("") 
   

     /*///////////////////////////////////////////////////////////////////dropdowndata/////////////////////////////////////////////////////////*/

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
    
    
    /*///////////////////////////////////////////////////////////////////Get Orgs/////////////////////////////////////////////////////////////*/


    /*////////////////////////////////////////////////////////////handle delete/////////////////////////////////////////////////////////////*/

    const handleDelete = async () => {
      const godeletetheorg = await fetch("/api/deleteOrg",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:selectorg})
      })
      const data = await godeletetheorg.json()
      if(godeletetheorg.ok){
        const godeletetheorg2 = await fetch("/api/deleteOrglist",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:selectorg})
      })
      const data2 = await godeletetheorg2.json()
      if(godeletetheorg2.ok){
        setSelectorg("")
        setSelectfunc("")
        setName("")
      }
      }
    }

    /*////////////////////////////////////////////////////////////handle delete/////////////////////////////////////////////////////////////*/


    /*////////////////////////////////////////////////////////////handle edit/////////////////////////////////////////////////////////////*/

    const handleedit = async () => {
      const goedittheorg = await fetch("/api/editOrg",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:selectorg,text:name})
      })
      const data = await goedittheorg.json()
      if(goedittheorg.ok){
        const goedittheorg2 = await fetch("/api/editOrglist",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:selectorg,text:name})
      })
      const data2 = await goedittheorg2.json()
      if(goedittheorg2.ok){
        setSelectorg("")
        setSelectfunc("")
        setName("")
      }
      }
    }

    /*////////////////////////////////////////////////////////////handle edit/////////////////////////////////////////////////////////////*/



  return (
    <div className='ManageOrgWrapper'>
        <div className='ManageOrg'>
            <select value={selectorg} onChange={(e)=>{setSelectorg(e.target.value)}}>
              <option value="" disabled hidden>
                  Select Orginization
                </option>
                {orgs.map((org) => (
                <option key={org.id} value={org.OrgID}>
               {org.name}
                  </option>
                ))}        
            </select>
            {selectorg!== "" && <select value={selectfunc} onChange={(e)=>{setSelectfunc(e.target.value)}}>
              <option value="" disabled hidden>
                  Select operation
                </option>
            <option value={"Delete"}>Delete</option>
            <option value={"edit"}>Edit</option>
            </select>}
            {selectfunc === "edit" && <input value={name} onChange={(e)=>{setName(e.target.value)}}></input>}
            {selectfunc === "Delete" &&<button onClick={() => handleDelete()}>Delete</button>}
            {selectfunc === "edit" && name !== "" &&<button onClick={() => handleedit()}>Edit</button>}
        </div>
    </div>
  )
}

export default ManageOrg
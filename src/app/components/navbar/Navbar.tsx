"use client"
import React, { useState } from 'react'
import "@/styles/navbar/navbar.css"

 type Navbarprops = {
  signingOut: () => void
    changePage:(text:string)=>void
 }





const Navbar = ({signingOut,changePage}:Navbarprops) => {


/*//////////////////////////////////////////////////Handle create Nav//////////////////////////////////////////////////////////////////////////*/



const [createV, setCreateV] = useState("")

const handleCreateNav = (value:string) => {
if(value === "addOrg"){
changePage(value)
setCreateV("")
}
if(value === "temp"){
  changePage(value)
  setCreateV("")
}

}

/*//////////////////////////////////////////////////Handle manage Nav///////////////////////////////////////////////////////////////////*/

const [manageV, setManageV] = useState("")

const handleManageNav = (value:string) => {
if(value === "addOrg"){
changePage(value)
setManageV("")
}
if(value === "ManageTemp"){
  changePage(value)
  setManageV("")
}

}




/*//////////////////////////////////////////////////Handle manage Nav///////////////////////////////////////////////////////////////////*/



  return (
    <div>
        <nav className='flex gap-10'>
          <img src="/betaleadlogo3.png" alt="logo" width={100}/>
            <ul className='flex gap-10 '>
              <li><select   value={createV} className='Navbarselect' 
              onChange={(e)=>{handleCreateNav(e.target.value)}}>
                <option value="" disabled hidden>
                  Create
                </option>
                <option value={"addOrg"}>orginasation</option>
                <option value={"temp"}>template</option>
                </select></li>
                <li><select value={manageV} className='Navbarselect'  onChange={(e)=>{handleManageNav(e.target.value)}}>
                  <option value="" disabled hidden
                  >
                    Manage
                  </option>
                  <option value="manageOrg">orginasation</option>
                  <option value="ManageTemp">template</option>
                  </select></li>
              <li><button  className='Navbarbutton' onClick={() => {changePage("Leads")}}>Leads</button></li>
              <li><button  className='Navbarbutton' onClick={() => {changePage("Contact")}}>Contact</button></li>
              <li><button  className='Navbarbutton'  onClick={() => {(signingOut())}}>Logout</button></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
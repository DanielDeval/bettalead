"use client"
import React, { useState } from 'react'

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
if(value === "temp"){
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
              <li><select   value={createV} 
              onChange={(e)=>{handleCreateNav(e.target.value)}}>
                <option value="" disabled hidden>
                  Create
                </option>
                <option value={"addOrg"}>orginasation</option>
                <option value={"temp"}>template</option>
                </select></li>
                <li><select value={manageV}  onChange={(e)=>{handleManageNav(e.target.value)}}>
                  <option value="" disabled hidden
                  >
                    Manage
                  </option>
                  <option value="manageOrg">orginasation</option>
                  <option value="manageTemp">template</option>
                  </select></li>
              <li onClick={() => {changePage("Leads")}}>Leads</li>
              <li onClick={() => {changePage("Contact")}}>Contact</li>
              <li onClick={() => {(signingOut())}}>Logout</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
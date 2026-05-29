"use client"
import Signin from "./components/SignIO/Signin/Signin";
import Signup from "./components/SignIO/Signup/Signup";
import InputForm from "./components/Savecontact/Savecontact";
import {useSession,signOut} from "../lib/auth-client"
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import Homebar from "./components/homebar/Homebar";
import Savecontact from "./components/Savecontact/Savecontact";
import AddOrganisation from "./components/AddOrganisation/AddOrganisation";
import AddTemplate from "./components/AddTemplate/AddTemplate";
import Contact from "./components/Contact/Contact";
import Loadingscreen from "./components/Loadingscreen/Loadingscreen";
import HomePage from "./components/HomePage/HomePage";
import "@/styles/Homepage/Homepage.css"
import ManageTemp from "./components/ManageTemp/ManageTemp";




/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

export default function Home() {


/*/////////////////////////////////////////////////////////////////////Sign in & out//////////////////////////////////////////////////////////*/

const { data: session, isPending } = useSession();

const [signup ,setSignup] = useState(false)
const [signin ,setSignin] = useState(false)

const startSignup = () => {
  setSignup(true)
}

const startSignin = () => {
  setSignin(true)
}


const SigninAndSignupBack = () => {
  setSignin(false)
  setSignup(false)
}


const signingOut = () => {
  signOut()
}




/*/////////////////////////////////////////////////////////////////////Sign in & out//////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////Page conrol//////////////////////////////////////////////////////////*/

const [page, setPage] = useState("home")

const changePage = (text:string) => {
  setPage(text)
}

/*/////////////////////////////////////////////////////////////////////Page conrol//////////////////////////////////////////////////////////*/




  return (
    <div className="HomepageBackround">
{/*/////////////////////////////////////////////////////////////////////Nav//////////////////////////////////////////////////////////*/}
      {session && !isPending && <Navbar  signingOut={signingOut} changePage={changePage}/>}
      {!session && !isPending && <Homebar  startSignin={startSignin}  startSignup={startSignup}/>}
      {isPending && <Loadingscreen/>}
      {signup && <Signup SigninAndSignupBack={SigninAndSignupBack}/>}
      {signin && <Signin SigninAndSignupBack={SigninAndSignupBack}/>}
      {page === "addOrg" && <AddOrganisation/>}
      {page === "temp" && <AddTemplate/>}
      {page === "Leads" && <Savecontact/>}
      {page === "Contact" && <Contact/>}
      {page === "home" && <HomePage/>}
      {page === "ManageTemp" && <ManageTemp/>}
      
{/*/////////////////////////////////////////////////////////////////////Nav//////////////////////////////////////////////////////////*/}
    </div>
  );
}

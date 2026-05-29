"use client"
import { Organisationlist, Templates, Templatesparts } from '@/generated/prisma/client';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react'
import "@/styles/ManageTemp/ManageTemp.css"


const ManageTemp = () => {

    const { data: session } = useSession();



/*///////////////////////////////////////////////////////////////////local data/////////////////////////////////////////////////////////////*/

const [localstate, setlocalstate] = useState({
    orgID:"",
    tempID:"",
    intropartID:"",
    IntroductionpartID:"",
    OfferpartID:"",
    PorfoliopartID:"",
    OutropartID:"",
    LinkspartID:"",
})


const [Formdata, setFormdata] = useState({
    name:"",
    intro:"",
    Introduction:"",
    Offer:"",
    Porfolio:"",
    Outro:"",
    Links:"",
})

/*///////////////////////////////////////////////////////////////////local data/////////////////////////////////////////////////////////////*/



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


/*///////////////////////////////////////////////////////////////////Get Orgs/////////////////////////////////////////////////////////////////*/



/*///////////////////////////////////////////////////////////////////Get templates////////////////////////////////////////////////////////////*/

const [templates, setTemplates] = useState<Templates[]>([])

 const getTemplates = async (input:string) => {
    const goGetTheOrgs = await fetch("/api/getCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organisationID: input })
    })

    const data = await goGetTheOrgs.json()
    setTemplates(data)
  }






/*///////////////////////////////////////////////////////////////////Get templates////////////////////////////////////////////////////////////*/

/*///////////////////////////////////////////////////////////////////Get template/////////////////////////////////////////////////////////////////*/

const [selectedtemplate, setSelectedtemplate] = useState<Templates>({
  name: "",
  id: "" ,
  category: "",
  intro: "",
  Introduction: "",
  Offer: "",
  Porfolio: "",
  Outro: "",
  Links: "",
  organisationID: "",
})



const selectthetemplate = async  (input:string) => {
 const selectedtemplate = templates.find(t => t.id === input)
 if (!selectedtemplate) return;
 setSelectedtemplate(selectedtemplate)
 setFormdata({
    name: selectedtemplate.name,
    intro: selectedtemplate.intro,
    Introduction: selectedtemplate.Introduction,
    Offer: selectedtemplate.Offer,
    Porfolio: selectedtemplate.Porfolio,
    Outro: selectedtemplate.Outro,
    Links: selectedtemplate.Links,
  });
 await getparts(input)
}



/*////////////////////////////////////////////////////////////////select template////////////////////////////////////////////////////////////*/



/*////////////////////////////////////////////////////////////////get template parts////////////////////////////////////////////////////////*/

const [extraparts, setExtraparts] = useState<Templatesparts[]>([])

const getparts = async (input:string) => {
  const gogetheparts = await fetch("/api/getparts",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({id:input})
  })
  const data = await gogetheparts.json()
  setExtraparts(Array.isArray(data) ? data : [])

}


const introparts = extraparts.filter((part)=>part.place ==="intro")

const Introductionparts = extraparts.filter((part)=>part.place ==="introduction")

const Offerparts = extraparts.filter((part)=>part.place ==="offer")

const Porfolioparts = extraparts.filter((part)=>part.place ==="porfolio")

const Outroparts = extraparts.filter((part)=>part.place ==="outro")

const Linksparts = extraparts.filter((part)=>part.place ==="links")

/*////////////////////////////////////////////////////////////////get template parts///////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////////handle template parts///////////////////////////////////////////////////*/


/*////////////////////////handle intro dropdowns///////////////////////////////*/

const [introdrop1, setIntrodrop1] = useState("")
const [introdrop2, setIntrodrop2] = useState("")
const [localintrostate, setLocalintrostate] = useState("")

const handleintrodropdown1 = (input:string) => {
  if(input === "edit"){
    setLocalintrostate(input)
  }
  if(input === "delete"){
    setLocalintrostate(input)
  }
  if(input === "back"){
    setIntrodrop1("")
    setIntrodrop2("")
    setLocalintrostate("")
  }
}


const handledropdown2intro = (input:string) => {
  const selectedpart = introparts.find(t => t.id === input)
  if(selectedpart){
  setFormdata((prev)=>({...prev,intro:selectedpart.text}))
}
}

const handleintrodelete = async () => {
  const deleteTheTemp = await fetch("/api/DeleteThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:introdrop2}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setIntrodrop1("")
    setIntrodrop2("")
    setLocalintrostate("")
  }
}

const handleintroedit = async () =>{
    const deleteTheTemp = await fetch("/api/EditThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:introdrop2,text:Formdata.intro}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setIntrodrop1("")
    setIntrodrop2("")
    setLocalintrostate("")
  }
}


/*////////////////////////handle intro dropdowns///////////////////////////////*/



/*////////////////////////handle introduction dropdowns////////////////////////*/

const [introductiondrop1, setIntroductiondrop1] = useState("")
const [introductiondrop2, setIntroductiondrop2] = useState("")
const [localintroductionstate, setLocalintroductionstate] = useState("")


const handleintroductiondropdown1 = (input:string) => {
  if(input === "edit"){
    setLocalintroductionstate(input)
  }
  if(input === "delete"){
    setLocalintroductionstate(input)
  }
  if(input === "back"){
    setIntroductiondrop1("")
    setIntroductiondrop2("")
    setLocalintroductionstate("")
  }
}

const handledropdown2introduction = (input:string) => {
  const selectedpart = Introductionparts.find(t => t.id === input)
  if(selectedpart){
  setFormdata((prev)=>({...prev,Introduction:selectedpart.text}))
}
}

const handleintroductiondelete = async () => {
  const deleteTheTemp = await fetch("/api/DeleteThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:introductiondrop2}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setIntroductiondrop1("")
    setIntroductiondrop2("")
    setLocalintroductionstate("")
  }
}

const handleintroductionedit = async () =>{
    const deleteTheTemp = await fetch("/api/EditThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:introductiondrop2,text:Formdata.Introduction}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setIntroductiondrop1("")
    setIntroductiondrop2("")
    setLocalintroductionstate("")
  }
}

/*////////////////////////handle introduction dropdowns////////////////////////*/



/*////////////////////////handle offer dropdowns////////////////////////*/

const [offerdrop1, setOfferdrop1] = useState("")
const [offerdrop2, setOfferdrop2] = useState("")
const [localofferstate, setLocalofferstate] = useState("")


const handleiofferdropdown1 = (input:string) => {
  if(input === "edit"){
    setLocalofferstate(input)
  }
  if(input === "delete"){
    setLocalofferstate(input)
  }
  if(input === "back"){
    setOfferdrop1("")
    setOfferdrop2("")
    setLocalofferstate("")
  }
}

const handledropdown2offer = (input:string) => {
  const selectedpart = Offerparts.find(t => t.id === input)
  if(selectedpart){
  setFormdata((prev)=>({...prev,Offer:selectedpart.text}))
}
}


const handleofferdelete = async () => {
  const deleteTheTemp = await fetch("/api/DeleteThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:offerdrop2}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setOfferdrop1("")
    setOfferdrop2("")
    setLocalofferstate("")
  }
}

const handleofferedit = async () =>{
    const deleteTheTemp = await fetch("/api/EditThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:offerdrop2,text:Formdata.Offer}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setOfferdrop1("")
    setOfferdrop2("")
    setLocalofferstate("")
  }
}



/*////////////////////////handle offer dropdowns////////////////////////*/



/*////////////////////////handle porfolio dropdowns////////////////////////*/

const [porfoliodrop1, setPorfoliodrop1] = useState("")
const [porfoliodrop2, setPorfoliodrop2] = useState("")
const [localporfoliostate, setLocalporfoliostate] = useState("")


const handleporfoliodropdown1 = (input:string) => {
  if(input === "edit"){
    setLocalporfoliostate(input)
  }
  if(input === "delete"){
    setLocalporfoliostate(input)
  }
  if(input === "back"){
    setPorfoliodrop1("")
    setPorfoliodrop2("")
    setLocalporfoliostate("")
  }
}

const handledropdown2porfolio = (input:string) => {
  const selectedpart = Porfolioparts.find(t => t.id === input)
  if(selectedpart){
  setFormdata((prev)=>({...prev,Porfolio:selectedpart.text}))
}
}


const handleporfoliodelete = async () => {
  const deleteTheTemp = await fetch("/api/DeleteThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:porfoliodrop2}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setPorfoliodrop1("")
    setPorfoliodrop2("")
    setLocalporfoliostate("")
  }
}

const handleporfolioedit = async () =>{
    const deleteTheTemp = await fetch("/api/EditThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:porfoliodrop2,text:Formdata.Porfolio}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setPorfoliodrop1("")
    setPorfoliodrop2("")
    setLocalporfoliostate("")
  }
}


/*////////////////////////handle porfolio dropdowns////////////////////////*/

/*////////////////////////handle outro dropdowns////////////////////////*/

const [outrodrop1, setOutrodrop1] = useState("")
const [outrodrop2, setOutrodrop2] = useState("")
const [localoutrostate, setLocaloutrostate] = useState("")

const handleoutrodropdown1 = (input:string) => {
  if(input === "edit"){
    setLocaloutrostate(input)
  }
  if(input === "delete"){
    setLocaloutrostate(input)
  }
  if(input === "back"){
    setOutrodrop1("")
    setOutrodrop2("")
    setLocaloutrostate("")
  }
}


const handledropdown2outro = (input:string) => {
  const selectedpart = Outroparts.find(t => t.id === input)
  if(selectedpart){
  setFormdata((prev)=>({...prev,Outro:selectedpart.text}))
}
}


const handleoutrodelete = async () => {
  const deleteTheTemp = await fetch("/api/DeleteThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:outrodrop2}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setOutrodrop1("")
    setOutrodrop2("")
    setLocaloutrostate("")
  }
}

const handleoutroedit = async () =>{
    const deleteTheTemp = await fetch("/api/EditThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:outrodrop2,text:Formdata.Outro}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setOutrodrop1("")
    setOutrodrop2("")
    setLocaloutrostate("")
  }
}

/*////////////////////////handle outro dropdowns////////////////////////*/

/*////////////////////////handle links dropdowns////////////////////////*/

const [linksdrop1, setLinksdrop1] = useState("")
const [linksdrop2, setLinksdrop2] = useState("")
const [locallinksstate, setLocallinksstate] = useState("")

const handlelinksdropdown1 = (input:string) => {
  if(input === "edit"){
    setLocallinksstate(input)
  }
  if(input === "delete"){
    setLocallinksstate(input)
  }
  if(input === "back"){
    setLinksdrop1("")
    setLinksdrop2("")
    setLocallinksstate("")
  }
}

const handledropdown2links = (input:string) => {
  const selectedpart = Linksparts.find(t => t.id === input)
  if(selectedpart){
  setFormdata((prev)=>({...prev,Links:selectedpart.text}))
}
}


const handlelinksdelete = async () => {
  const deleteTheTemp = await fetch("/api/DeleteThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:linksdrop2}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setLinksdrop1("")
    setLinksdrop2("")
    setLocallinksstate("")
  }
}

const handlelinksedit = async () =>{
    const deleteTheTemp = await fetch("/api/EditThepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:linksdrop2,text:Formdata.Links}),
  })
  const data = await deleteTheTemp.json()
  if(deleteTheTemp.ok){
    setLinksdrop1("")
    setLinksdrop2("")
    setLocallinksstate("")
  }
}

/*////////////////////////handle links dropdowns////////////////////////*/


/*////////////////////////////////////////////////////////////////handle template parts///////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////////handle template ///////////////////////////////////////////////////*/


const handletemplatedelete = async () => {
 const deleteTheTemplate = await fetch("/api/deleteTheTemplate",{
  method:"POST",
  headers:{"Content-type":"application/json"},
  body: JSON.stringify({id:localstate.tempID})
 })
 const data = await deleteTheTemplate.json()
}

const handletemplateedit = async () => {
 const editTheTemplate = await fetch("/api/editTheTemplate",{
  method:"POST",
  headers:{"Content-type":"application/json"},
  body: JSON.stringify({id:localstate.tempID,
                        name:Formdata.name,
                        intro:Formdata.intro,
                        introduction:Formdata.Introduction,
                        offer:Formdata.Offer,
                        portfolio:Formdata.Porfolio,
                        outro:Formdata.Outro,
                        links:Formdata.Links,
  })
 })
 const data = await editTheTemplate.json()
}

/*////////////////////////////////////////////////////////////////handle template ///////////////////////////////////////////////////*/


    
  return (
    <div  className='ManageTempWrapper'>
        <div className='ManageTemp'>
            <select value={localstate.orgID} onChange={(e)=>{getTemplates(e.target.value);
                                                             setlocalstate((prev)=>({...prev,orgID:e.target.value}))}}>
                <option value="" disabled hidden>
                  Select
                </option>
            {orgs.map((org) => (
          <option key={org.id} value={org.OrgID}>
            {org.name}
          </option>
        ))}
            </select>
            <select value={localstate.tempID} onChange={(e)=>{selectthetemplate(e.target.value);
                                                setlocalstate((prev)=>({...prev,tempID:e.target.value}))
            }}>
                <option value="" disabled hidden>
                  Select
                </option>
                {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
            </select>
        <input value={Formdata.name} onChange={(e)=>{setFormdata((prev)=>({...prev,name:e.target.value}))}}></input>
{/*////////////////////////////////////////////////////////////////intro parts///////////////////////////////////////////////////*/}
        <textarea value={Formdata.intro} onChange={(e)=>{setFormdata((prev)=>({...prev,intro:e.target.value}))}}></textarea>
        <select value={introdrop1} onChange={(e)=>{setIntrodrop1(e.target.value);handleintrodropdown1(e.target.value)}}>
          <option value="" disabled hidden>
                  manage parts
                </option>
                <option value="back">back</option>
          <option value={"edit"}>Edit part</option>
          <option value={"delete"}>Delete part</option>
          
        </select>
        {localintrostate && 
        <select value={introdrop2} onChange={(e)=>{setIntrodrop2(e.target.value);handledropdown2intro(e.target.value)}}>
          <option value="" disabled hidden>
                  Select Part
                </option>
          {introparts.map((intropart) => (
          <option key={intropart.id} value={intropart.id}>
            {intropart.name}
          </option>
        ))}
          </select>}
        {introdrop2 && introdrop1 === "edit"&&<button onClick={()=>{handleintroedit()}}>edit part</button>}
        {introdrop2 && introdrop1 === "delete"  &&<button onClick={()=>{handleintrodelete()}}>deletepart</button>}
{/*////////////////////////////////////////////////////////////////intro parts///////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Introduction parts///////////////////////////////////////////////////*/}
        <textarea value={Formdata.Introduction} onChange={(e)=>{setFormdata((prev)=>({...prev,Introduction:e.target.value}))}}></textarea>
        <select value={introductiondrop1} onChange={(e)=>{setIntroductiondrop1(e.target.value);handleintroductiondropdown1(e.target.value)}}>
          <option value="" disabled hidden>
                  manage parts
                </option>
                <option value="back">back</option>
          <option value={"edit"}>Edit part</option>
          <option value={"delete"}>Delete part</option>
        </select>
        {localintroductionstate && 
        <select value={introductiondrop2} onChange={(e)=>{setIntroductiondrop2(e.target.value);handledropdown2introduction(e.target.value)}}>
          <option value="" disabled hidden>
                  Select Part
                </option>
          {Introductionparts.map((Introductionpart) => (
          <option key={Introductionpart.id} value={Introductionpart.id}>
            {Introductionpart.name}
          </option>
        ))}
          </select>}
        {introductiondrop2 && introductiondrop1 === "edit"&&<button onClick={()=>{handleintroductionedit()}}>edit part</button>}
        {introductiondrop2 && introductiondrop1 === "delete"  &&<button onClick={()=>{handleintroductiondelete()}}>deletepart</button>}
{/*////////////////////////////////////////////////////////////////Introduction parts///////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Offer parts///////////////////////////////////////////////////*/}
        <textarea value={Formdata.Offer} onChange={(e)=>{setFormdata((prev)=>({...prev,Offer:e.target.value}))}}></textarea>
        <select value={offerdrop1} onChange={(e)=>{setOfferdrop1(e.target.value);handleiofferdropdown1(e.target.value)}}>
          <option value="" disabled hidden>
                  manage parts
                </option>
                <option value="back">back</option>
          <option value={"edit"}>Edit part</option>
          <option value={"delete"}>Delete part</option>
        </select>
        {localofferstate && 
        <select value={offerdrop2} onChange={(e)=>{setOfferdrop2(e.target.value);handledropdown2offer(e.target.value)}}>
          <option value="" disabled hidden>
                  Select Part
                </option>
          {Offerparts.map((Offerpart) => (
          <option key={Offerpart.id} value={Offerpart.id}>
            {Offerpart.name}
          </option>
        ))}
          </select>}
        {offerdrop2 && offerdrop1 === "edit"&&<button onClick={()=>{handleofferedit()}}>edit part</button>}
        {offerdrop2 && offerdrop1 === "delete"  &&<button onClick={()=>{handleofferdelete()}}>deletepart</button>}
{/*////////////////////////////////////////////////////////////////Offer parts///////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Porfolio parts///////////////////////////////////////////////////*/}
        <textarea value={Formdata.Porfolio} onChange={(e)=>{setFormdata((prev)=>({...prev,Porfolio:e.target.value}))}}></textarea>
        <select value={porfoliodrop1} onChange={(e)=>{setPorfoliodrop1(e.target.value);handleporfoliodropdown1(e.target.value)}}>
          <option value="" disabled hidden>
                  manage parts
                </option>
                <option value="back">back</option>
          <option value={"edit"}>Edit part</option>
          <option value={"delete"}>Delete part</option>
        </select>
        {localporfoliostate && 
        <select value={porfoliodrop2} onChange={(e)=>{setPorfoliodrop2(e.target.value);handledropdown2porfolio(e.target.value)}}>
          <option value="" disabled hidden>
                  Select Part
                </option>
          {Porfolioparts.map((Porfoliopart) => (
          <option key={Porfoliopart.id} value={Porfoliopart.id}>
            {Porfoliopart.name}
          </option>
        ))}
          </select>}
        {porfoliodrop2 && porfoliodrop1 === "edit"&&<button onClick={()=>{handleporfolioedit()}}>edit part</button>}
        {porfoliodrop2 && porfoliodrop1 === "delete"  &&<button onClick={()=>{handleporfoliodelete()}}>deletepart</button>}
{/*////////////////////////////////////////////////////////////////Porfolio parts///////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Outro parts///////////////////////////////////////////////////*/}
        <textarea value={Formdata.Outro} onChange={(e)=>{setFormdata((prev)=>({...prev,Outro:e.target.value}))}}></textarea>
        <select value={outrodrop1} onChange={(e)=>{setOutrodrop1(e.target.value);handleoutrodropdown1(e.target.value)}}>
          <option value="" disabled hidden>
                  manage parts
                </option>
                <option value="back">back</option>
          <option value={"edit"}>Edit part</option>
          <option value={"delete"}>Delete part</option>
        </select>
        {localoutrostate && 
        <select value={outrodrop2} onChange={(e)=>{setOutrodrop2(e.target.value);handledropdown2outro(e.target.value)}}>
          <option value="" disabled hidden>
                  Select Part
                </option>
          {Outroparts.map((Outropart) => (
          <option key={Outropart.id} value={Outropart.id}>
            {Outropart.name}
          </option>
        ))}
          </select>}
        {outrodrop2 && outrodrop1 === "edit"&&<button onClick={()=>{handleoutroedit()}}>edit part</button>}
        {outrodrop2 && outrodrop1 === "delete"  &&<button onClick={()=>{handleoutrodelete()}}>deletepart</button>}
{/*////////////////////////////////////////////////////////////////Outro parts///////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Links parts///////////////////////////////////////////////////*/}
        <textarea value={Formdata.Links} onChange={(e)=>{setFormdata((prev)=>({...prev,Links:e.target.value}))}}></textarea>
        <select value={linksdrop1} onChange={(e)=>{setLinksdrop1(e.target.value);handlelinksdropdown1(e.target.value)}}>
          <option value="" disabled hidden>
                  manage parts
                </option>
                <option value="back">back</option>
          <option value={"edit"}>Edit part</option>
          <option value={"delete"}>Delete part</option>
        </select>
        {locallinksstate && 
        <select value={linksdrop2} onChange={(e)=>{setLinksdrop2(e.target.value);handledropdown2links(e.target.value)}}>
          <option value="" disabled hidden>
                  Select Part
                </option>
          {Linksparts.map((Linkspart) => (
          <option key={Linkspart.id} value={Linkspart.id}>
            {Linkspart.name}
          </option>
        ))}
          </select>}
        {linksdrop2 && linksdrop1 === "edit"&&<button onClick={()=>{handlelinksedit()}}>edit part</button>}
        {linksdrop2 && linksdrop1 === "delete"  &&<button onClick={()=>{handlelinksdelete()}}>deletepart</button>}
{/*////////////////////////////////////////////////////////////////Links parts///////////////////////////////////////////////////*/}
<button onClick={()=>{handletemplateedit()}}>Edit Template</button>
<button onClick={()=>{handletemplatedelete()}}>Delete Template</button>
        </div>
    </div>
  )
}

export default ManageTemp
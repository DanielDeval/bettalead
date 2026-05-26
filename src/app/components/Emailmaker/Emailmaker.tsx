"use client"
import { Organisationlist, Templates, Templatesparts } from '@/generated/prisma/client'
import React, { useEffect, useState } from 'react'
import { text } from 'stream/consumers'
import "@/styles/Emailmaker/Emailmaker.css"

type Emailmakertype = {
    handleemailmode:(input:boolean)=>void
    localstate:{orgID:string,Contactname:string, email:string,companyID:string}
    removeContact:(id:string)=>void
    
    
}

const Emailmaker = ({handleemailmode,localstate,removeContact}:Emailmakertype) => {




/*///////////////////////////////////////////////////////////////////Get template/////////////////////////////////////////////////////////////////*/

const [templates, setTemplates] = useState<Templates[]>([])



useEffect(() => {
  const getTemplates = async () => {
    const goGetTheOrgs = await fetch("/api/getCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organisationID: localstate.orgID })
    })

    const data = await goGetTheOrgs.json()
    setTemplates(data)
  }

  if (localstate.orgID) {
    getTemplates()
  }
}, [localstate.orgID])


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



const selectthetemplate =  (input:string) => {
 const selectedtemplate = templates.find(t => t.id === input)
 if (selectedtemplate) setSelectedtemplate(selectedtemplate)
  if (selectedtemplate) setEmail(selectedtemplate)
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

/*////////////////////////////////////////////////////////////handle parts form////////////////////////////////////////////////////////*/

/*////////handle intro parts form///////////////////*/
 const [createintro, setCreateintro ] = useState(false)
  const [createintroname, setCreateintroname ] = useState("")

const handleintroparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, intro:selectedtemplate.intro}))
  }
  if(input && input !== "" && input !== "create"){
    setEmail(prev => ({...prev, intro:input}))
  }
  if(input === "create"){
    setCreateintro(true)
  }
}

const handlePartsaveintro = async () =>{
  const savethepart = await fetch("/api/savethepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name:createintroname, TemplatesID:selectedtemplate.id,place:"intro",text:email.intro})
  })
  const data = await savethepart.json()
  if(savethepart.ok){
    setCreateintro(false)
  }
}



/*////////handle intro parts form///////////////////*/

/*////////handle Introduction parts form///////////////////*/
 const [createintroduction, setCreateintroduction ] = useState(false)
 const [createintroductionname, setCreateintroductionname ] = useState("")

const handleIntroductionparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Introduction:selectedtemplate.Introduction}))
  }
  if(input && input !== "" && input !== "create"){
    setEmail(prev => ({...prev, Introduction:input}))
  }
  if(input === "create"){
    setCreateintroduction(true)
  }
}

const handlePartsaveIntroduction = async () =>{
  const savethepart = await fetch("/api/savethepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name:createintroductionname, TemplatesID:selectedtemplate.id,place:"introduction",text:email.Introduction})
  })
  const data = await savethepart.json()
  if(savethepart.ok){
    setCreateintroduction(false)
  }
}





/*////////handle Introduction parts form///////////////////*/


/*////////handle Offer parts form///////////////////*/
 const [createoffer, setCreateoffer ] = useState(false)
 const [createoffername, setCreateoffername ] = useState("")

const handleOfferparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Offer:selectedtemplate.Offer}))
  }
  if(input && input !== "" && input !== "create"){
    setEmail(prev => ({...prev, Offer:input}))
  }
  if(input === "create"){
    setCreateoffer(true)
  }
}

const handlePartsaveOffer = async () =>{
  const savethepart = await fetch("/api/savethepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name:createoffername, TemplatesID:selectedtemplate.id,place:"offer",text:email.Offer})
  })
  const data = await savethepart.json()
  if(savethepart.ok){
    setCreateoffer(false)
  }
}


/*////////handle Offer parts form///////////////////*/

/*////////handle Porfolio parts form///////////////////*/
const [createporfolio, setCreateporfolio ] = useState(false)
const [createporfolioname, setCreateporfolioname ] = useState("")

const handlePorfolioparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Porfolio:selectedtemplate.Porfolio}))
  }
  if(input && input !== "" && input !== "create"){
    setEmail(prev => ({...prev, Porfolio:input}))
  }
  if(input === "create"){
    setCreateporfolio(true)
  }
}


const handlePartsavePorfolio = async () =>{
  const savethepart = await fetch("/api/savethepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name:createporfolioname, TemplatesID:selectedtemplate.id,place:"porfolio",text:email.Porfolio})
  })
  const data = await savethepart.json()
  if(savethepart.ok){
    setCreateporfolio(false)
  }
}



/*////////handle Porfolio parts form///////////////////*/


/*////////handle Outro parts form///////////////////*/
 const [createoutro, setCreateoutro ] = useState(false)
 const [createoutroname, setCreateoutroname ] = useState("")

const handleOutroparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Outro:selectedtemplate.Outro}))
  }
  if(input && input !== "" && input !== "create"){
    setEmail(prev => ({...prev, Outro:input}))
  }
   if(input === "create"){
    setCreateoutro(true)
  }
}

const handlePartsaveOutro = async () =>{
  const savethepart = await fetch("/api/savethepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name:createoutroname, TemplatesID:selectedtemplate.id,place:"outro",text:email.Outro})
  })
  const data = await savethepart.json()
  if(savethepart){
    setCreateoutro(false)
  }
}


/*////////handle Outro parts form///////////////////*/


/*////////handle Links form///////////////////*/
const [createlinks, setCreatelinks ] = useState(false)
const [createlinksname, setCreatelinksname ] = useState("")

const handleLinksparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Links:selectedtemplate.Links}))
  }
  if(input && input !== "" && input !== "create"){
    setEmail(prev => ({...prev, Links:input}))
  }
  if(input === "create"){
    setCreatelinks(true)
  }
}

const handlePartsaveLinks = async () =>{
  const savethepart = await fetch("/api/savethepart",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name:createlinksname, TemplatesID:selectedtemplate.id,place:"links",text:email.Links})
  })
  const data = await savethepart.json()
  if(savethepart){
    setCreatelinks(false)
  }
}
/*////////handle Links form///////////////////*/
/*////////////////////////////////////////////////////////////handle parts form////////////////////////////////////////////////////////*/




/*////////////////////////////////////////////////////////////////handle email////////////////////////////////////////////////////////*/

const [email, setEmail] = useState({
  intro: "",
  Introduction: "",
  Offer: "",
  Porfolio: "",
  Outro: "",
  Links: "",
})


const handleCopyEmail =  () => {
  const convertIntro = (input:string) => {
    return input.replace(/{Company-Name}/g, localstate.Contactname)
  }
  const sections = [
    convertIntro(email.intro),
    email.Introduction,
    email.Offer,
    email.Porfolio,
    email.Outro,
    email.Links,
  ]

  const formattedEmail = sections.join("\n\n")


  return formattedEmail
}


const openGmailCompose = async () => {
  const body =  handleCopyEmail()
  const url =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(localstate.email)}` +
    `&su=${encodeURIComponent("Hello")}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(
    url,
    "gmailCompose",
    "width=900,height=700,resizable=yes,scrollbars=yes"
  );
}


/*////////////////////////////////////////////////////////////////handle email////////////////////////////////////////////////////////*/




/*////////////////////////////////////////////////////////////////handle contacted////////////////////////////////////////////////////*/


const setAsSaved = async () => {
  const setContactAsSaved = await fetch("/api/setContactAsSaved",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({orgID:localstate.companyID})
  })
  const data = await setContactAsSaved.json()
  if(setContactAsSaved.ok){
    handleemailmode(false)
    removeContact(localstate.companyID)
  }
}


/*////////////////////////////////////////////////////////////////handle contacted////////////////////////////////////////////////////////*/





  return (
    <div  className='EmailmakerWrapper'><div className='Emailmaker'>
{/*////////////////////////////////////////////////////////////////select template////////////////////////////////////////////////////////*/}
      <select  value={selectedtemplate.id} onChange={(e)=>{selectthetemplate(e.target.value);
                                                          getparts(e.target.value)
      }}>
          <option value="" disabled hidden>
                  Select Template
                </option>
          {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.category}
          </option>
        ))}
        </select>
{/*////////////////////////////////////////////////////////////////select template////////////////////////////////////////////////////////*/}

{/*////////////////////////////////////////////////////////////////into template////////////////////////////////////////////////////////*/}
<input value={email.intro} onChange={(e) => {setEmail(prev => ({...prev,intro:e.target.value}))}}></input>
<select defaultValue={""} onChange={(e)=>{handleintroparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  <option value="create">Create</option>
  {introparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
{createintro &&<input placeholder='name' value={createintroname} onChange={(e)=>{setCreateintroname(e.target.value)}}></input>}
{createintro && <button onClick={()=>{handlePartsaveintro()}}>save part</button>}
{/*////////////////////////////////////////////////////////////////into template////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Introduction template////////////////////////////////////////////////*/}
<textarea value={email.Introduction}  onChange={(e) => {setEmail(prev => ({...prev,Introduction:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleIntroductionparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  <option value="create">Create</option>
  {Introductionparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
{createintroduction &&<input placeholder='name' value={createintroductionname}  onChange={(e)=>{setCreateintroductionname(e.target.value)}}></input>}
{createintroduction && <button  onClick={()=>{handlePartsaveIntroduction()}}>save part</button>}
{/*////////////////////////////////////////////////////////////////Introduction template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Offer template////////////////////////////////////////////////*/}
<textarea value={email.Offer}  onChange={(e) => {setEmail(prev => ({...prev,Offer:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleOfferparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  <option value="create">Create</option>
  {Offerparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
{createoffer &&<input placeholder='name' value={createoffername} onChange={(e)=>{setCreateoffername(e.target.value)}}></input>}
{createoffer && <button  onClick={()=>{handlePartsaveOffer()}}>save part</button>}
{/*////////////////////////////////////////////////////////////////Offer template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Porfolio template////////////////////////////////////////////////*/}
<textarea value={email.Porfolio}  onChange={(e) => {setEmail(prev => ({...prev,Porfolio:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handlePorfolioparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  <option value="create">Create</option>
  {Porfolioparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
{createporfolio &&<input placeholder='name' value={createporfolioname} onChange={(e)=>{setCreateporfolioname(e.target.value)}}></input>}
{createporfolio && <button  onClick={()=>{handlePartsavePorfolio()}}>save part</button>}
{/*////////////////////////////////////////////////////////////////Porfolio template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Outro template////////////////////////////////////////////////*/}
<textarea value={email.Outro}  onChange={(e) => {setEmail(prev => ({...prev,Outro:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleOutroparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  <option value="create">Create</option>
  {Outroparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
{createoutro &&<input placeholder='name' value={createoutroname} onChange={(e)=>{setCreateoutroname(e.target.value)}}></input>}
{createoutro && <button  onClick={()=>{handlePartsaveOutro()}}>save part</button>}
{/*////////////////////////////////////////////////////////////////Outro template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Links template////////////////////////////////////////////////*/}
<textarea value={email.Links}  onChange={(e) => {setEmail(prev => ({...prev,Links:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleLinksparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  <option value="create">Create</option>
  {Linksparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
{createlinks &&<input placeholder='name' value={createlinksname} onChange={(e)=>{setCreatelinksname(e.target.value)}}></input>}
{createlinks && <button  onClick={()=>{handlePartsaveLinks()}}>save part</button>}
{/*////////////////////////////////////////////////////////////////Links template////////////////////////////////////////////////*/}
<button onClick={() => openGmailCompose()}>Compose Email</button>
<button onClick={() => setAsSaved()}>save as contacted</button>

    </div></div>
  )
}

export default Emailmaker
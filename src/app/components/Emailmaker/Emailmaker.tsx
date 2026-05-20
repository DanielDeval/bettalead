"use client"
import { Organisationlist, Templates, Templatesparts } from '@/generated/prisma/client'
import React, { useEffect, useState } from 'react'

type Emailmakertype = {
    handleemailmode:(input:boolean)=>void
    localstate:{orgID:string,Contactname:string}
}

const Emailmaker = ({handleemailmode,localstate}:Emailmakertype) => {




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
  const gogetheparts = await fetch("api/getparts",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({id:input})
  })
  const data = await gogetheparts.json()
  setExtraparts(data)
}


const introparts = extraparts.filter((part)=>part.place ==="intro")

const Introductionparts = extraparts.filter((part)=>part.place ==="Introduction")

const Offerparts = extraparts.filter((part)=>part.place ==="Offer")

const Porfolioparts = extraparts.filter((part)=>part.place ==="Porfolio")

const Outroparts = extraparts.filter((part)=>part.place ==="Outro")

const Linksparts = extraparts.filter((part)=>part.place ==="Links")

const handleintroparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, intro:selectedtemplate.intro}))
  }
  if(input && input !== ""){
    setEmail(prev => ({...prev, intro:input}))
  }
}

const handleIntroductionparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Introduction:selectedtemplate.Introduction}))
  }
  if(input && input !== ""){
    setEmail(prev => ({...prev, Introduction:input}))
  }
}

const handleOfferparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Offer:selectedtemplate.Offer}))
  }
  if(input && input !== ""){
    setEmail(prev => ({...prev, Offer:input}))
  }
}

const handlePorfolioparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Porfolio:selectedtemplate.Porfolio}))
  }
  if(input && input !== ""){
    setEmail(prev => ({...prev, Porfolio:input}))
  }
}

const handleOutroparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Outro:selectedtemplate.Outro}))
  }
  if(input && input !== ""){
    setEmail(prev => ({...prev, Outro:input}))
  }
}

const handleLinksparts = (input:string) => {
  if(input === ""){
    setEmail(prev => ({...prev, Links:selectedtemplate.Links}))
  }
  if(input && input !== ""){
    setEmail(prev => ({...prev, Links:input}))
  }
}


/*////////////////////////////////////////////////////////////////get template parts////////////////////////////////////////////////////////*/


/*////////////////////////////////////////////////////////////////handle email////////////////////////////////////////////////////////*/

const [email, setEmail] = useState({
  intro: "",
  Introduction: "",
  Offer: "",
  Porfolio: "",
  Outro: "",
  Links: "",
})


const handleCopyEmail = async () => {
  const sections = [
    email.intro,
    email.Introduction,
    email.Offer,
    email.Porfolio,
    email.Outro,
    email.Links,
  ]

  const formattedEmail = sections.join("\n\n")

  await navigator.clipboard.writeText(formattedEmail)
}


/*////////////////////////////////////////////////////////////////handle email////////////////////////////////////////////////////////*/











  return (
    <div>
{/*////////////////////////////////////////////////////////////////select template////////////////////////////////////////////////////////*/}
      <select  value={selectedtemplate.id} onChange={(e)=>{selectthetemplate(e.target.value)}}>
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
  {introparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
<input placeholder='name'></input>
<button>save part</button>
{/*////////////////////////////////////////////////////////////////into template////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////Introduction template////////////////////////////////////////////////*/}
<textarea value={email.Introduction}  onChange={(e) => {setEmail(prev => ({...prev,Introduction:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleIntroductionparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  {Introductionparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
<input placeholder='name'></input>
<button>save part</button>
{/*////////////////////////////////////////////////////////////////Introduction template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Offer template////////////////////////////////////////////////*/}
<textarea value={email.Offer}  onChange={(e) => {setEmail(prev => ({...prev,Offer:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleOfferparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  {Offerparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
<input placeholder='name'></input>
<button>save part</button>
{/*////////////////////////////////////////////////////////////////Offer template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Porfolio template////////////////////////////////////////////////*/}
<textarea value={email.Porfolio}  onChange={(e) => {setEmail(prev => ({...prev,Porfolio:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handlePorfolioparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  {Porfolioparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
<input placeholder='name'></input>
<button>save part</button>
{/*////////////////////////////////////////////////////////////////Porfolio template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Outro template////////////////////////////////////////////////*/}
<textarea value={email.Outro}  onChange={(e) => {setEmail(prev => ({...prev,Outro:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleOutroparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  {Outroparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
<input placeholder='name'></input>
<button>save part</button>
{/*////////////////////////////////////////////////////////////////Outro template////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////Links template////////////////////////////////////////////////*/}
<textarea value={email.Links}  onChange={(e) => {setEmail(prev => ({...prev,Links:e.target.value}))}}></textarea>
<select defaultValue={""}  onChange={(e)=>{handleLinksparts(e.target.value)}}>
  <option value="" disabled hidden>
                  Default
  </option>
  {Linksparts.map((part)=><option key={part.id} value={part.text}>{part.name}</option>)} 
</select>
<input placeholder='name'></input>
<button>save part</button>
{/*////////////////////////////////////////////////////////////////Links template////////////////////////////////////////////////*/}
<button onClick={() => handleCopyEmail()}>copy email</button>
    </div>
  )
}

export default Emailmaker
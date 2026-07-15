"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react'
import { signIn } from "@/lib/auth-client";
import "@/styles/Signio/SignIn.css"


type SigninTypes = {
  SigninAndSignupBack:()=>void
}

const Signin = ({SigninAndSignupBack}:SigninTypes) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      SigninAndSignupBack();
      return;
    }
  }

  
  return (
    <div className="Popup1" ><div className="Popup2">
      <h1>Signin</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} >
        <input className="Popup2input"
          name="email"
          type="email"
          placeholder="Email"
          required
          
        />
        <input className="Popup2input"
          name="password"
          type="password"
          placeholder="Password"
          required
          
        />
        <button className="Popup2button"
          type="submit"
         
        >
          Sign In
        </button>
        <button className="Popup2button" onClick={SigninAndSignupBack}>
          back
        </button>
        
      </form>
      
    </div></div>
  )
}

export default Signin
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react'
import { signUp } from "@/lib/auth-client";
import "@/styles/Signio/SignUp.css"



type SignupTypes = {
  SigninAndSignupBack:()=>void
}

const Signup = ({SigninAndSignupBack}:SignupTypes) => {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
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
      <h1>Signup</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input  className="Popup2input"
          name="name"
          placeholder="Full Name"
          required
          
        />
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
          minLength={8}
          
        />
        <button className="Popup2button"
          type="submit"
          
        >
          Create Account
        </button>
        <button  className="Popup2button" onClick={SigninAndSignupBack}>
          back
        </button>
      </form>
      
    </div></div>
    
  )
}

export default Signup

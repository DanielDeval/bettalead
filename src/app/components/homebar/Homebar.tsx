import React from 'react'


type Homebartype = {
  startSignin:()=>void
  startSignup:()=>void
}


const Homebar = ({startSignin,startSignup}:Homebartype) => {





  return (
    <div>
        <nav className='flex gap-10'>
          <img src="/betaleadlogo3.png" alt="logo" width={100}/>
            <ul className='flex gap-10 '>
              <li onClick={startSignin}>Log in</li>
              <li onClick={startSignup}>Sign up</li>
            </ul>
        </nav>
    </div>
  )
}

export default Homebar
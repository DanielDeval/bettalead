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
              <li><button className='Navbarbutton' onClick={startSignin}>Log in</button></li>
              <li><button className='Navbarbutton' onClick={startSignup}>Log in</button></li>
            </ul>
        </nav>
    </div>
  )
}

export default Homebar
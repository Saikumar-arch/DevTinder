
import React, { useState } from 'react'

const Login = () => {
  
  const [username, SetUsername] = useState("")
  const [emailId, SetEmailid] = useState("")
  const [password, SetPassword] = useState("")
  const [issignin, SetSignin] = useState(true)
  
 
  const toggleSignin = () =>{
      SetSignin(!issignin)
  }

  return (
    <div className="flex justify-center my-10">
       <div className="card bg-slate-600 w-96 shadow-sm">
  <div className="card-body">

    {!issignin && (
      <div className='mx-3 '>
      <h3 className="card-title">Username : {username}</h3>
     
       <input 
      type="text" 
      index = {username}
      placeholder="Username" 
      className="input input-md my-2" 
      onChange={(e)=>SetUsername(e.target.value)}
      />
     
      
      </div>)}
    
    <div className='mx-3 '>
     <h3 className="card-title">Email:{emailId} </h3>
      <input 
      type="email" 
      index = {emailId}
      placeholder="Type here!!!" 
      className="input input-md my-2" 
      onChange={(e)=>SetEmailid(e.target.value)}
      />
      </div>

    <div className='mx-3 '>
     <h3 className="card-title">Password:{password} </h3>
      <input 
      index={password}
      type="text" 
      placeholder="Password" 
      className="input input-md my-2"
      onChange = {(e)=>SetPassword(e.target.value)} 
      />

    </div>
    
    <div className="card-actions justify-center">
      <button className="btn btn-primary">
        {issignin ? "SignIn" : "Sign Up"}
        </button>
    </div>
    <p className='m-2 cursor-pointer'
        onClick={toggleSignin}
        >New to Dev tinder? {issignin ? "Sign Up " :"Sign in"}</p>
  </div>
</div>
    </div>
  )
}

export default Login
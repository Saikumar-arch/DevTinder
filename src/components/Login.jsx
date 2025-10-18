
import React, { useState } from 'react'

const Login = () => {
   
  const [emailId, SetEmailid] = useState("")
  const [password, SetPassword] = useState("")


  return (
    <div className="flex justify-center my-10">
       <div className="card bg-slate-600 w-96 shadow-sm">
  <div className="card-body">
    
    <div className='mx-3 '>
     <h2 className="card-title">Email:{emailId} </h2>
      <input 
      type="email" 
      index = {emailId}
      placeholder="Type here!!!" 
      className="input input-md my-2" 
      onChange={(e)=>SetEmailid(e.target.value)}
      />
      </div>

    <div className='mx-3 '>
     <h2 className="card-title">Password:{password} </h2>
      <input 
      index={password}
      type="text" 
      placeholder="Password" 
      className="input input-md my-2"
      onChange = {(e)=>SetPassword(e.target.value)} 
      />

    </div>
    
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
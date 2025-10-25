
import React, { useRef, useState } from 'react'

import { CheckValidation } from '../Utility/Validation'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Login = () => {
  
  const [username, SetUsername] = useState("")
  const [emailId, SetEmailid] = useState("test@example.com")
  const [password, SetPassword] = useState("Password@123")
  const [issignin, SetSignin] = useState(true)
  const [errorMessage, SetErrorMessage] = useState({})
  const dispatch = useDispatch()

  
  
 
  const toggleSignin = () =>{
      SetSignin(!issignin)
  }

  const ValidateEmail = useRef(null)
  const ValidatePassword= useRef(null)

  const handleClickButton = async() =>{
      const errorMessage = CheckValidation(ValidateEmail.current.value, ValidatePassword.current.value)
      
      SetErrorMessage(errorMessage)

     try {
  const res = await axios.post(
    "http://localhost:3000/api/login",
    {
      email: emailId,
      password: password
    },
    {
      withCredentials: true
    }
    
  );
  console.log("Login successful:", res.data);
  dispatch (res.data)

} catch (err) {
  console.error("Login failed:", err);
}
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
      ref={ValidateEmail}
      type="email"
      index = {emailId}
      placeholder="Type here!!!"
      className="input input-md my-2"
      onChange={(e)=>SetEmailid(e.target.value)}
      />
      <p className='text-red-700 text-lg'>{errorMessage.email}</p>
    </div>

    <div className='mx-3 '>
     <h3 className="card-title">Password:{password} </h3>

      <input
      ref={ValidatePassword}
      index={password}
      type="text"
      placeholder="Password"
      className="input input-md my-2"
      onChange = {(e)=>SetPassword(e.target.value)}
      />
      <p className='text-red-700 text-lg'>{errorMessage.password}</p>
    </div>
    
    <div className="card-actions justify-center">
      <button 
      className="btn btn-primary"
      onClick={handleClickButton}
      >
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
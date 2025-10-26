import { Await, Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import axios from 'axios'
import { BASE_URL } from '../Utility/constants.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utility/userSlice.jsx'
import { useEffect } from 'react'

const Body = () => {
  
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const userData  = useSelector((store) => store.user)

  const fetchData = async() =>{
    try{
      const res = await axios.get(BASE_URL+"/api/profile",{
        withCredentials : true
      })
      dispatch(addUser(res.data))
    }
    catch (err) {
  if (err.response && err.response.status === 404) {
    navigate("/login"); //redirect to login page
  } else {
    console.error(err);
  }
  }
  }
  useEffect(()=>{
    if(!userData){fetchData()}
    },[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body
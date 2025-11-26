import { Outlet, useNavigate } from 'react-router-dom'
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

  const fetchData = async() => {
    try {
      const res = await axios.get(BASE_URL + "/api/profile", {
        withCredentials: true
      });

      console.log("Profile Data:", res.data.user); // Check console to see the structure

      // 🛑 THE FIX IS HERE: 
      // Your backend sends { message: "...", user: { ... } }
      // So you must access res.data.user
      if (res.data.user) {
        dispatch(addUser(res.data.user));
      }
      
    } catch (err) {
      console.error("Profile fetch error:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        navigate("/login"); 
      }
    }
  }

  useEffect(() => {
    // Only fetch if we don't already have user data
    if (!userData) {
      fetchData();
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body
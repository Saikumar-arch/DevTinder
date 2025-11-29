import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../Utility/constants";
import { addUser } from "../Utility/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchData = async () => {
    if (userData) return; 

    try {
      const res = await axios.get(BASE_URL + "/api/profile", {
        withCredentials: true,
      });
      if (res.data && res.data.user) {
        dispatch(addUser(res.data.user));
      }
    } catch (err) {
      console.error("Profile Check Failed:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
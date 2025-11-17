import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utility/constants";
import { removeUser } from "../Utility/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/Login");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev-Tinder
        </Link>
      </div>

      <div className="flex-none gap-4 items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-32 md:w-auto"
        />
        <p>Welcome, {user?.firstName || "Guest"}</p>

        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-3">
              <div className="w-8 rounded-full">
                <img
                  alt="user"
                  src={
                    user.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
              <li>
                <Link to="/Settings">Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

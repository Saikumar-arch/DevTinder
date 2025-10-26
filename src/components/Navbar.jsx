import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Dev-Tinder</Link>
      </div>

      <div className="flex flex-none gap-2 items-center">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-22 md:w-auto"
          />
        </div>
        <p>Welcome, {user?.firstName || 'Guest'}</p>
        {user&&<div className="dropdown dropdown-end">
          
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mx-6"
          >
           
            <div className="w-8 rounded-full">
              
                <img
                alt={user ? "user" : "Guest"}
                src={user ? "https://png.pngtree.com/png-vector/20230831/ourlarge/pngtree-man-avatar-image-for-profile-png-image_9197908.png" : "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_login_man-1024.png"}
                />

             
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/Profile" className="justify-between">Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/Settings">Settings</Link></li>
            <li><Link to="/Login">Login</Link></li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;

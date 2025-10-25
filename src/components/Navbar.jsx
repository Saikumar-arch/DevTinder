import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dev-Tinder</a>
      </div>

      <div className="flex flex-none gap-2 items-center">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-22 md:w-auto"
          />
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mx-6"
          >
            <p>Welcome, {user?.firstName || 'Guest'}</p>
            <div className="w-8 rounded-full">
              
                <img
                alt={user ? "user" : "Guest"}
                src={user ? "https://placekitten.com/100/100" : "https://thumbs.dreamstime.com/b/guest-avatar-vector-illustration-default-male-profile-icon-image-profile-guest-avatar-vector-illustration-default-male-profile-182095612.jpg"}
                />

             
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/Profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/Settings">Settings</Link></li>
            <li><Link to="/Login">Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

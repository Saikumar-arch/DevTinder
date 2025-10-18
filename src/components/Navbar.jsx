import React from 'react'

const Navbar = () => {
  return (
    <div>
        <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Dev-Tinder</a>
  </div>
  <div className="flex flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-22 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-6">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://media.licdn.com/dms/image/v2/D5603AQFb5trIE8xVqA/profile-displayphoto-crop_800_800/B56Zm1otwMIAAM-/0/1759688974865?e=1762992000&v=beta&t=95FmC7zWj-faXj4fZVJoPF24G-EDtEvMRcVEHvRjQ2M" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Login</a></li>
      </ul>
    </div>
  </div>
</div>
      </div> 
  )
}

export default Navbar
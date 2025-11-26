import React, { useState } from 'react';
import UserCard from './userCard';
import axios, { Axios } from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../Utility/constants';
import { addUser } from '../Utility/userSlice';
import toast from 'react-hot-toast';



const EditProfile = ({ user }) => {
  
  // Safety check
  if (!user) return null;

  // State variables
  const dispatch = useDispatch();

  const [fullName, SetFullName] = useState(" ");
  const [Photo, SetPhotoURL] = useState(" "); 
  const [Age, SetAge] = useState(" ");
  const [Gender, SetGender] = useState("");
  const [Organization, SetOrganization] = useState(" "); 
  const [Role, SetRole] = useState(""); 
  const [Skills, SetSkills] = useState(""); 

  

  const saveprofile = async () => {
    console.log("Save button clicked!"); 
    

    try {
      
      const toastId = toast.loading("Saving profile...");

      const payload = {
        firstName: fullName.split(" ")[0], 
        lastName: fullName.split(" ").slice(1).join(" "),
        photoUrl: Photo,
        age: Age,
        gender: Gender,
        about: Organization,
        skills: Skills
      };

      console.log("Sending Payload:", payload);
      console.log("try is passing")

      const res = await axios.patch(
        BASE_URL + "/api/profile/edit",
        payload,
        { withCredentials: true }
      );

      console.log("Server Response:", res);
      if (res.data && res.data.user) {
        console.log("if is passing")
        dispatch(addUser(res?.data?.user));
        toast.success("Profile Updated Successfully!", {
            id: toastId,
        });
      }else{
        console.log("else pasiing")
      }

    } catch (error) {
      console.error("API Error:", error.message);
      toast.error("Error updating profile: " + error.message);
    }
  };


  return (
    <div className="flex flex-wrap justify-center my-10 gap-10 items-start">
      <div className="card bg-slate-600 w-96 shadow-xl">
        <div className="card-body text-white">
          <h1 className="card-title justify-center mb-4">Edit Profile</h1>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Full Name</span></label>
            <input type="text" value={fullName} onChange={(e) => SetFullName(e.target.value)} className="input input-bordered w-full text-white" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Profile Picture</span></label>
            <input type="text" value={Photo} onChange={(e) => SetPhotoURL(e.target.value)} className="input input-bordered w-full text-white" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Age</span></label>
            <input type="text" value={Age} onChange={(e) => SetAge(e.target.value)} className="input input-bordered w-full text-white" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Gender</span></label>
            <select value={Gender} onChange={(e) => SetGender(e.target.value)} className="select select-bordered w-full text-white">
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Organization</span></label>
            <input type="text" value={Organization} onChange={(e) => SetOrganization(e.target.value)} className="input input-bordered w-full text-white" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Skills</span></label>
            <input type="text" value={Skills} onChange={(e) => SetSkills(e.target.value)} className="input input-bordered w-full text-white" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text text-white">Role</span></label>
            <input type="text" value={Role} onChange={(e) => SetRole(e.target.value)} className="input input-bordered w-full text-white" />
          </div>

          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary px-10" onClick={saveprofile}>Save Profile</button>
          </div>
        </div>
      </div>
      <div className="mt-5 md:mt-0"> 
        <h2 className="text-center text-xl font-bold mb-4 text-white">Live Preview</h2>
        <UserCard user={{
            fullName:fullName,
            profileImage: Photo,
            age: Age,
            gender: Gender,
            organisation: Organization,
            profession: Role,
            skills: Skills
        }} />
      </div>

    </div>
  );
};

export default EditProfile;
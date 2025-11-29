import axios from "axios";
import { BASE_URL } from "../Utility/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Utility/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return <h2>Loading...</h2>;  

  const {
    id, // 1. Get ID directly from user object
    fullName,
    age,
    gender,
    profileImage,
    profession,
    organisation,
    skills,
    about,
  } = user;
  
  const handleAcceptIgnore = async(status, id) =>{
    try {
      // 2. FIX URL: Use Template Literals `${}`
      // 3. FIX STATUS: backend expects "interested" or "ignored"
      await axios.post(
        `${BASE_URL}/api/request/send/${status}/${id}`,
        {},
        {withCredentials:true}
      );
      dispatch(removeFeed(id));
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-center card bg-sky-900 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={profileImage} alt={fullName} className="rounded-xl" />
      </figure>
      
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">
          {[fullName, age, gender].filter(Boolean).join(", ")}
        </h2>
        {/* 5. Join skills array if it exists */}
        <h2 className="card-title text-sm text-gray-300">
            {skills ? skills.join(", ") : ""}
        </h2>
        
        <h2 className="text-gray-200">{about}</h2>
        <p className="text-gray-400">I am a {profession} at {organisation}</p>

        <div className="card-actions mt-4">
          {/* 6. FIX: Use onClick and correct spelling */}
          <button 
            className="btn btn-primary" 
            onClick={() => handleAcceptIgnore("interested", id)} 
          >
            Interested
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => handleAcceptIgnore("ignored", id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
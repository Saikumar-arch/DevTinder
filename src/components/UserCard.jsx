import axios from "axios";
import { BASE_URL } from "../Utility/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Utility/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return <h2>Loading...</h2>;  

  const {
    id,
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
    <div className="w-96 min-h-80 flex-center card bg-indigo-500 border-pink-700 shadow-lg m-8 rounded-2xl">
      <figure className="px-6 pt-6 m-2 w-68 h-68">
        <img src={profileImage} alt={fullName} className="rounded-2xl" />
      </figure>
      
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">
          {[fullName, age, gender].filter(Boolean).join(", ")}
        </h2>
        <h2 className="card-title text-sm text-gray-300">
            {skills ? skills.join(", ") : ""}
        </h2>
        
        <h2 className="text-gray-200">{about}</h2>
        <p className="text-gray-400">I am a {profession} at {organisation}</p>

        <div className="card-actions mt-4">
          <button 
            className="btn bg-blue-700 border-pink-700 hover:scale-110 gap-4 shadow-3xl" 
            onClick={() => handleAcceptIgnore("interested", id)} 
          >
            Interested
          </button>
          
          <button 
            className="btn bg-pink-700 border-blue-900 hover:scale-110 gap-4" 
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
import { BASE_URL } from '../Utility/constants';
import { useDispatch, useSelector } from 'react-redux'; 
import { addConnection } from '../Utility/connectionSlice'; 
import axios from 'axios';
import { useEffect } from 'react';
import UserCard from './userCard'; 
import ConnectionsCards from './ConnectionsCards';

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connection); 

  const fetchConnections = async () => {
    try {
     
      const res = await axios.get(BASE_URL + "/api/user/connections", {
        withCredentials: true,
      });

     
      if (res.data && res.data.data) {
        dispatch(addConnection(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1 className="text-center mt-10">Loading...</h1>;

  if (connections.length === 0) {
     return <h1 className="text-center mt-10 text-2xl">No Connections Found! 😢</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold text-white mb-5">Connections</h1>
      
      <div className="flex flex-wrap justify-center gap-6">
        
        {connections.map((user) => (
           <div key={user.id} className="scale-90">
             <ConnectionsCards user={user} />
           </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
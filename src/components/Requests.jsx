import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utility/constants";
import { addRequest, removeRequest } from "../Utility/requestSlice"; // Import from your slice

const Requests = () => {
  const dispatch = useDispatch();
  
  // 1. Get data from Store (Match the key in appStore.js)
  const requests = useSelector((store) => store.requests);

  // 2. Fetch Data API
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/user/requests/received", {
        withCredentials: true,
      });

      // Dispatch to Redux
      if (res.data && res.data.data) {
        dispatch(addRequest(res.data.data));
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  // 3. Handle Accept/Reject Logic
  const reviewRequest = async (status, id) => {
    try {
      // Call API to update backend
      await axios.post(
        `${BASE_URL}/api/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      // Remove from Redux Store immediately (UI Update)
      dispatch(removeRequest(id)); 

    } catch (err) {
      console.error(`Error ${status} request:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1 className="text-center my-10 text-white">Loading...</h1>;

  if (requests.length === 0) {
    return <h1 className="text-center my-10 text-xl text-white">No Connection Requests Found!</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold text-white mb-10">Connection Requests</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {requests.map((request) => (
          <div
            key={request.requestId} // Use requestId from backend
            className="flex flex-col w-80 bg-base-300 shadow-xl rounded-xl overflow-hidden border border-gray-700"
          >
            {/* Image */}
            <img
              src={request.profileImage}
              alt={request.firstName}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-5 flex flex-col items-center text-white">
              <h2 className="text-2xl font-bold">
                {request.firstName} {request.lastName}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {request.profession} at {request.organisation}
              </p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{request.about}</p>
              
              {/* Buttons */}
              <div className="flex justify-between w-full mt-6 gap-4">
                <button
                  onClick={() => reviewRequest("rejected", request.requestId)}
                  className="btn btn-error w-1/2 text-white"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequest("accepted", request.requestId)}
                  className="btn btn-success w-1/2 text-white"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
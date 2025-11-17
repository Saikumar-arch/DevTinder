import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../Utility/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utility/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(`${BASE_URL}/api/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log("Feed fetch error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    // <div className="p-5">
    //   <h2 className="text-xl font-semibold mb-4">Feed</h2>
    //   <div>
    //     {feed?.length > 0 ? (
    //       feed.map((item) => (
    //         <div
    //           key={item.id}
    //           className="border p-3 my-2 rounded bg-base-200 shadow-sm"
    //         >
    //           <h3 className="font-bold">{item.fullName}</h3>
    //           <p>{item.profession}</p>
    //           <small>{item.organisation}</small>
    //         </div>
    //       ))
    //     ) : (
    //       <p>No feed data available</p>
    //     )}
    //   </div>
    // </div>
    <div className="flex justify-center">
      <UserCard></UserCard>
    </div>
  );
};

export default Feed;

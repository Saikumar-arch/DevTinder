import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../Utility/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utility/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const user = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/feed`, {
        withCredentials: true,
      });
      dispatch()

      // FIX 1: Changed from res.data.data to res.data.feeds
      dispatch(addFeed(res?.data?.feeds)); // array of users
    } catch (err) {
      console.log("Feed fetch error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // FIX 2: Added a loading check before rendering
  if (!user || user.length === 0) {
    return <h1 className="text-center">Loading...</h1>;
  }

  // FIX 3: Map over all users to render them
  return (
    <div className="flex flex-col items-center">
      <div className="my-10 mx-10">
      {user.map((user) => (
        <UserCard 
        key={user.id} user={user} />
      ))}
      </div>
    </div>
  );
};

export default Feed;
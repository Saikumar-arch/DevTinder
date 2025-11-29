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
      if (res.data && res.data.data) {
          dispatch(addFeed(res.data.data));
      }

    } catch (err) {
      console.log("Feed fetch error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!user || user.length === 0) {
    return <h1 className="text-center">Loading...</h1>;
  }

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
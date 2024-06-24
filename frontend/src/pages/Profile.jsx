import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Profile = ({ user, isAuthenticated, setUser }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      {user ? (
        <div className="h-screen w-screen flex justify-between ">
            <div className="w-[512px] mx-auto mt-20 flex flex-col gap-10 items-center">
              <img src={user.image} className="w-20 rounded-full"
              loading="lazy"
              alt="" />
              <p className="text-2xl font-bold tracking-wider">Name:- <span>{user.name}</span></p>
              <p className="text-2xl font-bold tracking-wider">Email:- <span>{user.email}</span></p>
              <p className="text-2xl font-bold tracking-wider">phone No. :- <span>{user.phone}</span></p>
              <p className="text-2xl font-bold tracking-wider">Created At :- <span>{new Date(user.createdAt).toLocaleDateString("en-GB")}</span></p>
            </div>
        </div>
      ) : (
        <h1>Something went wrong please login again !! Error 404</h1>
      )}
    </div>
  );
};

export default Profile;

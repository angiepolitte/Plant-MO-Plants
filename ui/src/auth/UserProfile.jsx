import React, { useState } from "react";
import { useMyContext } from "../store/ContextApi";
import Avatar from "@mui/material/Avatar";

const UserProfile = () => {
  // Access the currentUser and token hook using the useMyContext custom hook from the ContextProvider
  const { currentUser } = useMyContext();
  return (
    <div className="xl:w-[70%] lg:w-[80%] sm:w-[90%] w-full mx-auto px-4 min-h-[500px] flex lg:flex-row flex-col gap-4">
      <div className="flex-1 bg-white rounded-xl shadow-2xl shadow-purple-300 p-6 transition-all duration-300 hover:shadow-indigo-400">
        <div className="flex flex-col items-center gap-3">
          <Avatar
            alt={currentUser?.username}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 80, height: 80 }}
          />
          <h3 className="font-bold text-3xl text-indigo-700">
            {currentUser?.username}
          </h3>
        </div>
        <div className="my-6 px-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-slate-800">
              Username:
            </span>
            <span className="text-indigo-600 font-normal">
              {currentUser?.username}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-slate-800">Role:</span>
            <span className="text-emerald-600 font-normal">
              {currentUser?.roles[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

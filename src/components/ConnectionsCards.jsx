import React from 'react';

const ConnectionsCards = ({ user }) => {
  if (!user) return null;

  const {
    fullName,
    profileImage,
    profession,
    organisation,
    about,
  } = user;

  return (
    <>
      {/* 1. w-72: Decreases horizontal size
         2. h-[28rem]: Increases vertical size
         3. flex-col: Stacks everything vertically
      */}
      <div className="flex flex-col w-72 h-[28rem] overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* TOP SECTION: Image */}
        <div className="h-48 w-full bg-gray-100">
          <img 
            src={profileImage || "https://geographyandyou.com/images/user-profile.png"} 
            alt={fullName} 
            className="h-full w-full object-cover" 
          />
        </div>

        {/* MIDDLE SECTION: Text Content */}
        <div className="flex flex-1 flex-col items-center p-5 text-center">
          
          {/* Name */}
          <h6 className="mb-1 text-xl font-bold text-gray-800">
            {fullName}
          </h6>

          {/* Profession & Organization */}
          <div className="mb-3 flex flex-col text-sm">
            <span className="font-semibold text-[#9b87f5]">{profession}</span>
            <span className="text-gray-500 text-xs">{organisation}</span>
          </div>

          {/* About (Bio) */}
          <p title={about} className="text-xs text-gray-600 line-clamp-3">
            {about || "No bio available for this user."}
          </p>

        </div>

        {/* BOTTOM SECTION: Button */}
        {/* mt-auto ensures this pushes to the very bottom of the card */}
        <div className="mt-auto border-t border-gray-100 bg-gray-50 p-4">
          <a
            href="javascript:void(0)"
            className="block w-full rounded-lg bg-[#9b87f5] py-2 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-600"
          >
            View Profile
          </a>
        </div>

      </div>
    </>
  );
};

export default ConnectionsCards;
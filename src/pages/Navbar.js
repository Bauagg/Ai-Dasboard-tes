import React from "react";
import ImgLogo from "../assets/logo.png";
import VectorLogo from "../assets/Vector.png";
import ImgLogoTwo from "../assets/a17.png";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-white px-10 py-2 items-center">
      {/* Left Logo */}
      <div>
        <img src={ImgLogo} alt="logo" className="h-10" />
      </div>

      {/* Center Search Bar */}
      <div className="flex items-center bg-white border border-blue-400 rounded-full px-4 py-1 w-1/2">
        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"></path>
        </svg>
        <input type="text" placeholder="What news are you looking for?" className="outline-none w-full text-gray-600" />
      </div>

      {/* Right Logos */}
      <div className="flex gap-4 items-center">
        <img src={ImgLogoTwo} alt="logo" className="h-8" />
        <img src={VectorLogo} alt="logo" className="h-8" />
      </div>
    </div>
  );
};

export default Navbar;

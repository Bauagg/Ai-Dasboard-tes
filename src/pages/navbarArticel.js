import React, { useState } from "react";
import { Global, Vidio, Sports, Liberal, Lifestyle, Entertaiment, Orang, Technology, Bisnis, Sehat, Corona, Travel, Goodnews } from "../assets/icon";
import { Link } from "react-router-dom";
import Menu from "../assets/menu.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Untuk mengelola state dari hamburger m// Untuk navigasi ke halaman "/data"

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu
  };

  return (
    <nav className="bg-white py-2">
      <div className="container mx-auto flex items-center gap-14 ">
        {/* Hamburger Menu */}
        <div className="">
          <button className="text-black focus:outline-none" onClick={handleHamburgerClick}>
            {/* Hamburger icon */}
            <img src={Menu} alt=""></img>
          </button>
          {/* Menu yang muncul saat hamburger diklik */}
          {isMenuOpen && (
            <div className="absolute top-10 left-0 w-full bg-white shadow-md">
              <Link to="/">
                <button className="block w-full text-left py-2 px-4 text-black hover:bg-gray-200">Beranda</button>
              </Link>

              <Link to="/data">
                <button className="block w-full text-left py-2 px-4 text-black hover:bg-gray-200">Data</button>
              </Link>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center justify-between w-full">
          {navItems.map((item) => (
            <button key={item.name} className="flex flex-col items-center">
              <item.icon className="w-6 h-6 text-gray-500" />
              <span className="text-xs text-gray-500">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const navItems = [
  { name: "Breaking", icon: Global },
  { name: "Vidio", icon: Vidio },
  { name: "Entertaiment", icon: Entertaiment },
  { name: "Sports", icon: Sports },
  { name: "Conservative", icon: Orang },
  { name: "Liberal", icon: Liberal },
  { name: "Technology", icon: Technology },
  { name: "Busines", icon: Bisnis },
  { name: "Health", icon: Sehat },
  { name: "Travel", icon: Travel },
  { name: "Lefestyle", icon: Lifestyle },
  { name: "Good News", icon: Goodnews },
  { name: "Corona Virus", icon: Corona },
];

export default Navbar;

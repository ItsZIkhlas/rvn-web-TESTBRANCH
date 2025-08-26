import Image from "next/image";
import React from "react";

const navItems = [
  {
    title: "About Us",
    link: "#",
  },
  {
    title: "Pricing",
    link: "#",
  },
  {
    title: "Shop Now",
    link: "#",
  },
  {
    title: "Contact Us",
    link: "#",
  },
];

const NavBar = () => {
  return (
    <div className="flex flex-row items-center justify-between self-center w-[85%] bg-[#171717] rounded-md py-2 px-6">
      <Image src="/globe.svg" alt="logo" width={32} height={32} />
      <ul className="flex flex-row gap-12 cursor-pointer">
        {navItems.map((item) => (
          <li className="hover:bg-[#262626] py-3 px-4 rounded-md">
            {item.title}
          </li>
        ))}
      </ul>
      <button
        className="
    relative inline-flex items-center justify-center
    px-6 py-2 rounded-md font-lato font-medium text-white
    bg-gradient-to-r from-[#1fd1f9] to-[#b621fe]
    transition-all duration-300 ease-out
    hover:brightness-110 hover:scale-[1.05] active:scale-[0.98]
    shadow-md hover:shadow-lg"
      >
        Sign Up
      </button>
    </div>
  );
};

export default NavBar;

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: 0, title: "Home", link: "/" },
  { id: 1, title: "Pricing", link: "/pricing" },
  { id: 3, title: "About Us", link: "#" },
  { id: 4, title: "Contact Us", link: "#" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center">
      <div className="flex items-center justify-between w-[90%] md:w-[85%] bg-[#171717] rounded-md py-2 px-4 md:px-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            RVN
          </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-6 lg:gap-12 cursor-pointer">
          {navItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <li className="hover:bg-[#262626] py-2 px-3 rounded-md transition">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>

        {/* Sign Up Button */}
        <Link href="/waitlist">
        <button className="hidden md:inline-flex items-center justify-center px-6 py-2 rounded-md font-lato font-medium text-white bg-violet-500 transition-all duration-300 hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] shadow-md hover:shadow-lg">
          Join Waitlist
        </button>
        </Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#171717] flex flex-col items-center py-4 gap-4 md:hidden rounded-b-md shadow-lg">
          {navItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <li
                className="list-none hover:bg-[#262626] py-2 px-4 rounded-md w-[90%] text-center"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </li>
            </Link>
          ))}
          <Link href="/waitlist">
          <button
            className="mt-2 px-6 py-2 rounded-md font-lato font-medium text-white bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] shadow-md hover:shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            Join Waitlist
          </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

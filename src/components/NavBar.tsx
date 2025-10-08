"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: 0, title: "HOME", link: "/" },
  { id: 1, title: "PRICING", link: "/pricing" },
  { id: 3, title: "ABOUT US", link: "/about-us" },
  { id: 4, title: "CONTACT US", link: "/contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center font-['Montserrat',sans-serif]">
      <div className="flex items-center justify-between w-[90%] md:w-[85%] hover:bg-[#171717] transition duration-400 rounded-md py-4 px-12 md:px-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
          RVN
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-6 lg:gap-12 cursor-pointer font-bold text-white">
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
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-[80%] bg-[#111111] overflow-hidden rounded-2xl shadow-xl border-t border-white/10 animate-slideDown mt-4 ml-12">
          <ul className="flex flex-col items-center py-6 space-y-4">
            {navItems.map((item) => (
              <Link key={item.id} href={item.link} className="w-full">
                <li
                  className="list-none w-[85%] mx-auto py-3 text-lg font-medium text-white/80 text-center rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>

          <div className="flex justify-center pb-6">
            <Link href="/waitlist" className="w-[85%]">
              <button
                className="w-full py-3 rounded-xl font-semibold text-white bg-violet-500 shadow-lg hover:brightness-110 hover:scale-105 active:scale-95 transition-transform duration-200"
                onClick={() => setIsOpen(false)}
              >
                Join Waitlist
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

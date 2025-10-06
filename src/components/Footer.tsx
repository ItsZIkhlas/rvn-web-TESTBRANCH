"use client";

import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-gray-300 py-16 px-6 overflow-hidden font-['Montserrat',sans-serif]">
      {/* Neon Orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-soft-light filter blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-[150px] opacity-15 animate-pulse" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            RVN
          </h1>
          <p className="text-gray-400 mt-2">Elevate your riding experience.</p>
        </div>

        {/* Social Media */}
        <div className="flex gap-4">
          {/* <a href="#" className="hover:text-white transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Youtube className="w-6 h-6" />
          </a> */}
          {/* <a href="#" className="hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a> */}
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        © 2025 RVN. All rights reserved.
      </div>
    </footer>
  );
}

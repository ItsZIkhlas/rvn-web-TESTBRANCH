"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";

const WaitlistPage = () => {
  // You can fetch this from Supabase later, but for now we'll hardcode it
  const [spotsLeft] = useState(128); // Example value

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* Gradient Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_60%)]" />

        <NavBar />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 mb-4">
          Join the RVN Waitlist
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Be among the first to experience the world’s first AI-powered track coach.  
          Sign up now and secure your spot for a board.
        </p>

        {/* Spots Left */}
        <div className="mb-8">
          <p className="text-sm md:text-base font-medium text-gray-400">
            Only <span className="text-violet-400 font-bold">{spotsLeft}</span> spots left
          </p>
        </div>

        {/* Waitlist Form */}
        <form className="flex w-full max-w-md flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 font-semibold hover:opacity-90 transition"
          >
            Join
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default WaitlistPage;

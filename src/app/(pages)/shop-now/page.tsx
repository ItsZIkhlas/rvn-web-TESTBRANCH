"use client";

import React from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

const ShopPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Gradient Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_70%)]" />

      {/* Navbar */}
      <div className="relative z-20">
        <NavBar />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center relative z-10 px-6 mt-30">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 mb-6"
        >
          Ride the Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          Meet <span className="text-violet-400 font-semibold">RVN</span> — the
          AI-powered device that redefines speed, precision, and
          intelligence on the track.
        </motion.p>

        {/* Product Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Image
            src="/motorcycle.png"
            alt="RVN Motorcycle"
            width={900}
            height={600}
            className="drop-shadow-[0_0_50px_rgba(138,43,226,0.7)] rounded-xl"
            priority
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mt-12 py-6"
        >
          <Link href={`/waitlist`}>
            <button className="px-8 py-4 cursor-pointer rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-lg font-semibold shadow-[0_0_20px_rgba(138,43,226,0.6)] hover:scale-105 transition-transform">
              Order Now
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default ShopPage;

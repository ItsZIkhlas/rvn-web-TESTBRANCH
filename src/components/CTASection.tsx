"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Animated orbs in the background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-500 rounded-full mix-blend-soft-light filter blur-[150px] opacity-30 animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-[150px] opacity-20 animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 mb-6"
        >
          Take Your Riding to the Next Level
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl mb-12"
        >
          RVN gives you real-time insights, AI coaching, and data-driven feedback to improve every lap on the track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-6"
        >
          <Link href="/pricing">
            <button className="px-10 py-4 md:py-5 rounded-lg text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] shadow-md hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300">
              See Pricing
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-10 py-4 md:py-5 rounded-lg text-xl md:text-2xl font-bold text-white border-2 border-violet-500 hover:bg-violet-500 hover:bg-opacity-20 transition-all duration-300">
              Sign Up Free
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

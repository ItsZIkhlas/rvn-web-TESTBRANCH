"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center px-6 text-center mt-20 md:mt-32">
      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent"
      >
        Choose Your Plan
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-300 text-lg md:text-xl mt-4 max-w-2xl"
      >
        Pick the plan that fits your riding needs. Whether you're a casual rider or a pro, RVN has a plan for you.
      </motion.p>

    </section>
  );
}

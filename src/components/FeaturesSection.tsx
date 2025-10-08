"use client";

import Image from "next/image";
import { Cpu, BarChart3, BrainCircuit, Gauge } from "lucide-react";
import { motion } from "framer-motion";

// Items data with responsive Tailwind grid spans
const items = [
  {
    type: "image",
    src: "/images/race-bike.jpg",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
  },
  {
    title: "AI Coaching",
    description: "Tailored feedback powered by AI.",
    icon: Cpu,
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "Performance Analytics",
    description: "Detailed telemetry and lap insights.",
    icon: BarChart3,
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-2",
  },
  {
    title: "Performance Analytics",
    description: "Detailed telemetry and lap insights.",
    icon: BarChart3,
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-2",
  },
  {
    title: "Adaptive Learning",
    description: "Insights that evolve as you improve.",
    icon: BrainCircuit,
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    title: "Live Telemetry",
    description: "Real-time data visualization.",
    icon: Gauge,
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-1",
  },
];

export default function ControlledMasonry() {
  return (
    <section className="min-h-screen flex-col items-center justify-center px-6 py-16 w-full mx-auto relative z-10">
      {/* Section Title */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent"
        >
          Next-Level Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl mt-4"
        >
          Everything you need to unlock your true potential on the track.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[180px] gap-4 max-w-6xl w-full mx-auto relative">
        {items.map((item, i) => {
          const Icon = item.icon;

          if (item.type === "image") {
            return (
              <div
                key={i}
                className={`${item.className} relative overflow-hidden rounded-2xl`}
              >
                <Image
                  src={item.src}
                  alt={item.title || "Feature image"}
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition-all"
                />
              </div>
            );
          }

          return (
            <div
              key={i}
              className={`
    ${item.className} 
    relative flex flex-col justify-center items-center text-center
    p-6 rounded-2xl overflow-hidden
    bg-gray-800
    border-4 border-violet-500
    shadow-lg
    transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
  `}
            >
              {/* Icon */}
              {Icon && (
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-10 h-10 mb-3 text-blue-400 z-10"
                >
                  <Icon className="w-full h-full" />
                </motion.div>
              )}

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 z-10">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base z-10">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

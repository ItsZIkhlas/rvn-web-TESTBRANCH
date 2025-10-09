"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, MessageSquare, Repeat } from "lucide-react";
import Approach from "./Approach";

const steps = [
  {
    title: "Attach Device",
    description: "Connect Raven to your bike to start tracking every move.",
    icon: Cpu,
    color: "from-violet-500 via-blue-400 to-violet-400",
  },
  {
    title: "Ride the Track",
    description:
      "Raven monitors speed, lean angles, and braking precision in real-time.",
    icon: Activity,
    color: "from-blue-400 via-violet-500 to-blue-400",
  },
  {
    title: "Receive Feedback",
    description: "Get AI-powered coaching tailored to your riding style.",
    icon: MessageSquare,
    color: "from-violet-500 via-blue-400 to-violet-500",
  },
  {
    title: "Improve & Repeat",
    description:
      "Track progress, refine skills, and shave seconds off every lap.",
    icon: Repeat,
    color: "from-blue-400 via-violet-500 to-blue-400",
  },
];

const bikes = [
  { delay: 0, duration: 6 },
  { delay: 0, duration: 8 },
  { delay: 0, duration: 7 },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-24 font-['Montserrat',sans-serif] z-20">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          id="bikePath"
          d="M 0 500 C 300 400, 800 700, 2000 300"
          stroke="gray"
          strokeWidth="4"
          strokeDasharray="15 15"
          fill="transparent"
          style={{ filter: "blur(3px)", opacity: 1 }}
        />
      </svg>
      {/* Bikes with smooth neon trails */}
      {bikes.map((bike, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: "-40px",
            left: "-1%",
            offsetPath: "path('M 0 500 C 300 400, 900 700, 2000 300')",
            offsetRotate: "auto",
          }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: bike.duration,
            ease: "linear",
            delay: bike.delay,
          }}
        >
          <img
            src="/motorbike.png"
            width={120}
            className="relative z-10"
          />

          <div
            className="absolute h-1 rounded-full"
            style={{
              top: "120px",
              marginLeft: "-70px",
              width: "150px",
              background: "linear-gradient(to right, #953ce7ff, transparent)",
              filter: "blur(5px)",
              opacity: 0.6,
            }}
          />
        </motion.div>
      ))}
      {/* Section Title */}
      <div className="text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl mt-4"
        >
          Follow these simple steps to elevate your riding performance.
        </motion.p>
      </div>

      {/* Steps */}
      <Approach />
    </section>
  );
}

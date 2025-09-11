"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, MessageSquare, Repeat } from "lucide-react";

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

export default function HowItWorks() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-24">
      {/* Section Title */}
      <div className="text-center mb-16 md:mb-24 max-w-3xl">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center w-full max-w-6xl">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
              className="flex flex-col items-center p-4"
            >
              {/* Icon Circle */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr ${step.color} mb-6 shadow-lg`}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Watch Video Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 md:mt-16"
      >
        <button
          className="mx-auto flex items-center justify-center px-10 py-5 rounded-lg font-lato text-2xl md:text-3xl font-medium text-white bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] transition-all duration-300 ease-out hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          Watch Video
        </button>
      </motion.div>
    </section>
  );
}

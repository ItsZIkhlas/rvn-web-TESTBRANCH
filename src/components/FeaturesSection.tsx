"use client";

import { motion } from "framer-motion";
import { CloudLightning, BarChart3, BrainCircuit } from "lucide-react";

const features = [
  {
    title: "AI Coaching",
    description:
      "After session guidance powered by AI, tailored to your riding style.",
    icon: CloudLightning,
  },
  {
    title: "Advanced Analytics",
    description:
      "Monitor speed, lean angles, and overall performance with detailed insights.",
    icon: BarChart3,
  },
  {
    title: "Adaptive Training",
    description:
      "Personalized feedback that evolves as you improve on the track.",
    icon: BrainCircuit,
  },
];

export default function FeatureSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center px-6 font-['Montserrat',sans-serif] z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl"
      >
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10 transition-all">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group rounded-2xl p-1 bg-gradient-to-r from-violet-500/60 via-blue-500/60 to-violet-500/60"
            >
              <div className="bg-black rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all group-hover:bg-gradient-to-b group-hover:from-violet-950 group-hover:to-black">
                <feature.icon className="h-12 w-12 text-violet-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

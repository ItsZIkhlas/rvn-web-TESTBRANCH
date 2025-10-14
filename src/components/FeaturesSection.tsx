"use client";

import Image from "next/image";
import { Cpu, BarChart3, BrainCircuit, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import ImageBlock from "./ImageBlock";

const features = [
  {
    id: 1,
    title: "Advanced Sensors",
    description:
      "Our cutting-edge sensors capture high-fidelity data, providing unparalleled insights into your performance.",
  },
  {
    id: 2,
    title: "In-Depth Analysis",
    description:
      "Leverage powerful analytics to identify strengths and areas for improvement, helping you make data-driven decisions.",
  },
  {
    id: 3,
    title: "AI-Powered Coaching",
    description:
      "Our AI-driven coaching system offers personalized feedback and training plans to help you reach your full potential.",
  },
];

export default function ControlledMasonry() {
  return (
    <section className="min-h-screen flex-col items-start justify-center w-[75%] z-10 font-['Montserrat',sans-serif]">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-8xl font-light text-white mb-6">Meet RVN</h1>
        <h2 className="text-xl font-extralight text-white mb-20">
          Rvn turns your data into insights with AI coaching, helping you unlock
          your full potential on the track.
        </h2>
      </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-6 lg:gap-12 justify-center items-baseline w-full">
          {features.map((feature) => (
            <div className="max-w-md" key={feature.id}>
              <ImageBlock width={450} height={400} />
              <div className="mt-4 flex items-center gap-4"></div>
              <h3 className="text-2xl font-semibold text-white mt-2">
                {feature.title}
              </h3>
              <p className="text-white/80 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
    </section>
  );
}

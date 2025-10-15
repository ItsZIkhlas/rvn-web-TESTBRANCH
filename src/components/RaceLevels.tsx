"use client";

import { useState } from "react";
import ImageBlock from "./ImageBlock";

const features = [
  {
    id: 1,
    title: "Intermediate Racers",
    steps: [
      "Understand advanced racing techniques",
      "Analyze your performance data",
      "Implement AI-driven coaching tips",
    ],
    description:
      "Take your racing skills to the next level with RVN's advanced features designed for intermediate racers.",
  },
  {
    id: 2,
    title: "Advanced Racers",
    steps: [
      "Master complex racing strategies",
      "Utilize in-depth performance analytics",
      "Refine your skills with expert feedback",
    ],
    description:
      "Leverage powerful analytics to identify strengths and areas for improvement, helping you make data-driven decisions.",
  },
  {
    id: 3,
    title: "Expert Racers",
    steps: [
      "Optimize every aspect of your racing",
      "Access exclusive training plans",
      "Engage with a community of elite racers",
    ],
    description:
      "Our AI-driven coaching system offers personalized feedback and training plans to help you reach your full potential.",
  },
];

export default function RaceLevel() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex-col items-start justify-center w-[75%] z-10 font-['Montserrat',sans-serif]">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-5xl font-light text-white mb-6">Race to Learn</h1>
      </div>
      <ImageBlock width={1450} height={450} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 w-full">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            onClick={() =>
              setSelectedFeature(selectedFeature === index ? null : index)
            }
            className={`border-t-7 pt-5 cursor-pointer transition-all duration-300 ${
              selectedFeature === null
                ? "opacity-100"
                : selectedFeature === index
                  ? "opacity-100 scale-105 bg-white/10 p-4 shadow-xl ring-2 ring-white/20"
                  : "opacity-40 scale-95"
            }`}
          >
            <h2 className="font-bold text-2xl mb-4">{feature.title}</h2>
            <div className="flex flex-col max-w-md gap-2">
              <h3 className="font-medium">You will learn to:</h3>
              <ul>
                {feature.steps?.map((step, stepIndex) => (
                  <li key={stepIndex}>- {step}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

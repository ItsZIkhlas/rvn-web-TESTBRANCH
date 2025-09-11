"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$19",
    highlight: false,
    features: [
      "Basic Telemetry Tracking",
      "1 Bike Profile",
      "Standard Lap Analysis",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    highlight: true,
    features: [
      "Advanced Telemetry Tracking",
      "Up to 3 Bike Profiles",
      "Detailed Lap Analysis",
      "Cornering & Braking Insights",
      "AI Coaching Recommendations",
      "Priority Email Support",
    ],
  },
  {
    name: "Elite",
    price: "$99",
    highlight: false,
    features: [
      "Full Telemetry Suite",
      "Unlimited Bike Profiles",
      "Real-Time Lap Feedback",
      "Advanced AI Coaching",
      "Track Comparison & Reports",
      "Phone & Email Support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative w-full py-32 px-6 text-white flex flex-col items-center">
      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent text-center"
      >
        Choose Your Plan
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-300 text-lg md:text-xl mt-4 max-w-2xl text-center"
      >
        Pick the plan that fits your riding needs. Whether you're a casual rider or a pro, RVN has a plan for you.
      </motion.p>

      {/* Pricing Cards */}
      <div className="mt-16 w-full max-w-6xl grid md:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: plan.highlight ? 1.08 : 1.05 }}
            className={`flex flex-col items-center text-center rounded-3xl p-8 md:p-10
              bg-gradient-to-br from-gray-900 to-gray-800
              border-2 ${plan.highlight ? "border-violet-400 shadow-[0_0_40px_rgba(138,43,226,0.7)]" : "border-gray-700"}
              transition-transform duration-300
              select-text cursor-default`}
          >
            {/* Plan Name */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{plan.name}</h3>

            {/* Price */}
            <p className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              {plan.price}
              <span className="text-lg md:text-xl font-medium text-gray-400">/mo</span>
            </p>

            {/* Features */}
            <ul className="text-gray-300 text-md mb-6 space-y-2 flex flex-col items-start">
              {plan.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>

            {/* Select Button */}
            <button
              className={`mt-auto px-8 py-3 rounded-lg font-medium text-white
                bg-gradient-to-r from-[#1fd1f9] to-[#b621fe]
                hover:brightness-110 hover:scale-[1.05] active:scale-[0.98]
                transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer`}
            >
              Select
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

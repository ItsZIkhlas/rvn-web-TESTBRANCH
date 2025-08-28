"use client";

import { motion } from "framer-motion";

const features = [
  { name: "Telemetry Tracking", starter: true, pro: true, elite: true },
  { name: "Bike Profiles", starter: "1", pro: "3", elite: "Unlimited" },
  { name: "Lap Analysis", starter: "Standard", pro: "Detailed", elite: "Real-Time" },
  { name: "Cornering & Braking Insights", starter: false, pro: true, elite: true },
  { name: "AI Coaching Recommendations", starter: false, pro: true, elite: true },
  { name: "Track Comparison & Reports", starter: false, pro: false, elite: true },
  { name: "Support", starter: "Email", pro: "Priority Email", elite: "Phone & Email" },
];

export default function PricingCompare() {
  return (
    <section className="w-full py-32 px-6 flex flex-col items-center text-white bg-black">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 bg-clip-text text-transparent mb-12 text-center"
      >
        Compare Features
      </motion.h2>

      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="w-full border-separate border-spacing-y-4 text-center">
          <thead>
            <tr>
              <th className="rounded-tl-2xl rounded-bl-2xl bg-gray-900/70 py-4 px-6">Feature</th>
              <th className="bg-gray-900/70 py-4 px-6">Starter</th>
              <th className="bg-gray-900/70 py-4 px-6">Pro</th>
              <th className="rounded-tr-2xl rounded-br-2xl bg-gray-900/70 py-4 px-6">Elite</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, idx) => (
              <tr
                key={idx}
                className="bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition"
              >
                <td className="py-3 px-4 text-left rounded-l-xl">{f.name}</td>
                <td className="py-3 px-4">{f.starter === true ? "✔️" : f.starter || "—"}</td>
                <td className="py-3 px-4">{f.pro === true ? "✔️" : f.pro || "—"}</td>
                <td className="py-3 px-4 rounded-r-xl">{f.elite === true ? "✔️" : f.elite || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

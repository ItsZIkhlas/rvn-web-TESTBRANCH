"use client";

import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Rider",
    role: "Pro Racer",
    avatar: "/pfp1.jpg",
    stars: 5,
    review:
      "RVN has completely transformed how I approach racing. The insights are sharp and actionable. After just a week, I shaved nearly two seconds off my average lap time.",
  },
  {
    name: "Jamie Lee",
    role: "Track Enthusiast",
    avatar: "/pfp2.jpg",
    stars: 4,
    review:
      "The AI coaching feels like having a personal trainer in my pocket. RVN doesn’t just give data — it explains what matters most and how to improve without overwhelming you.",
  },
  {
    name: "Morgan Smith",
    role: "Speed Demon",
    avatar: "/pfp3.jpg",
    stars: 5,
    review:
      "RVN’s real-time tracking is a game-changer. I can literally see where I’m losing time and fix it instantly. It’s like having a pit crew analyzing every corner.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Trusted by Racers Worldwide
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Hear how RVN is helping drivers push their limits and unlock
          performance they didn’t know they had.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-900/70 border border-zinc-800 rounded-2xl shadow-lg hover:shadow-violet-500/20 transition">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                  <div className="flex justify-center text-violet-400">
                    {"★".repeat(t.stars)}
                    {"☆".repeat(5 - t.stars)}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {t.review}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

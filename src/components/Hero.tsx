"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ravenOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [0, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[200vh] w-full flex flex-col items-center justify-center"
    >
      {/* Raven */}
      <motion.div
        style={{ opacity: ravenOpacity }}
        className="fixed top-1/3 flex flex-col items-center text-center"
      >
        <h1 className="text-violet-400 text-7xl md:text-9xl font-bold">
          Raven
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        style={{ opacity: subtitleOpacity }}
        className="fixed top-1/2 -translate-y-1/2 text-white text-3xl md:text-3xl font-medium text-center max-w-xl px-4"
      >
        The world’s first AI-powered track coach for riders who demand precision
        and performance.
      </motion.p>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade animations
  const ravenOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const subtitleOpacityWithOffset = useTransform(subtitleOpacity, (v) => v + 0);

  return (
    <section
      ref={ref}
      className="relative h-[150vh] w-full flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Raven Title */}
      <motion.div
        style={{ opacity: ravenOpacity }}
        className="hidden sm:flex fixed top-1/3 left-1/2 -translate-x-1/2 flex-col items-center text-center z-20"
      >
        <h1 className="text-violet-400 text-7xl md:text-9xl font-bold">
          Raven
        </h1>
      </motion.div>

      <motion.p
        style={{ opacity: subtitleOpacityWithOffset }}
        className="text-white text-4xl font-medium text-center max-w-md px-4 mt-250 z-50 "
      >
        The world’s first AI-powered track coach for riders who demand precision
        and performance.
      </motion.p>

      <motion.div
        style={{ opacity: ravenOpacity }}
        className="sm:hidden absolute top-[25vh] left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-20"
      >
        <h1 className="text-violet-400 text-7xl font-bold">Raven</h1>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const introducingOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const ravenOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]);
  
  // Subtitle fades in in the middle of the page
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 1], [0, 0, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[500vh] w-full bg-black flex flex-col items-center justify-center"
    >
      {/* Introducing */}
      <motion.h1
        style={{ opacity: introducingOpacity }}
        className="text-white text-6xl md:text-8xl font-bold fixed top-1/3"
      >
        Introducing
        {[".", ".", "."].map((dot, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            className="inline-block"
          >
            {dot}
          </motion.span>
        ))}
      </motion.h1>

      {/* Raven */}
      <motion.div
        style={{ opacity: ravenOpacity }}
        className="fixed top-1/3 flex flex-col items-center text-center"
      >
        <h1 className="text-violet-400 text-7xl md:text-9xl font-bold">
          Raven
        </h1>
      </motion.div>

      {/* Subtitle in the middle */}
      <motion.p
        style={{ opacity: subtitleOpacity }}
        className="fixed top-1/2 -translate-y-1/2 text-white text-3xl md:text-3xl font-medium text-center max-w-xl px-4"
      >
        The world’s first AI-powered track coach for riders who demand precision and performance.
      </motion.p>
    </section>
  );
}

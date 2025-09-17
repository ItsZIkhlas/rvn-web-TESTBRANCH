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
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 1],
    [0, 1, 0]
  );

  
  const bikes = [
    { delay: 0, duration: 6 },
    { delay: 0, duration: 8 },
    { delay: 0, duration: 7 },
  ];

  return (
    <section
      ref={ref}
      className="relative h-[200vh] w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          id="bikePath"
          d="M 0 500 C 300 400, 800 700, 2000 300"
          stroke="gray"
          strokeWidth="4"
          strokeDasharray="15 15"
          fill="transparent"
          style={{ filter: "blur(3px)", opacity: 1 }}
        />
      </svg> */}
      {/* Bikes with smooth neon trails */}
      {/* {bikes.map((bike, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: "-40px",
            left: "-1%",
            offsetPath: "path('M 0 500 C 300 400, 900 700, 2000 300')",
            offsetRotate: "auto",
          }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: bike.duration,
            ease: "linear",
            delay: bike.delay,
          }}
        >
          <img
            src="/motorbike.png"
            width={120}
            className="relative z-10"
          />

          <div
            className="absolute h-1 rounded-full"
            style={{
              top: "120px",
              marginLeft: "-70px",
              width: "150px",
              background: "linear-gradient(to right, #953ce7ff, transparent)",
              filter: "blur(5px)",
              opacity: 0.6,
            }}
          />
        </motion.div>
      ))} */}
      {/* Raven */}
      
      <motion.div
        style={{ opacity: ravenOpacity }}
        className="fixed top-1/3 flex flex-col items-center text-center z-20"
      >
        <h1 className="text-violet-400 text-7xl md:text-9xl font-bold">
          Raven
        </h1>
      </motion.div>
      {/* Subtitle */}
      <motion.p
        style={{ opacity: subtitleOpacity }}
        className="fixed z-0 top-1/2 -translate-y-1/2 text-white text-3xl md:text-3xl font-medium text-center max-w-xl px-4 z-20"
      >
        The world’s first AI-powered track coach for riders who demand precision
        and performance.
      </motion.p>
    </section>
  );
}

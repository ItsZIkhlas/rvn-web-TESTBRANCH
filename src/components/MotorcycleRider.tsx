"use client";

import { motion } from "framer-motion";

interface Props {
  src?: string;
  width?: number;
}

export default function MotorcycleRider({
  src = "/motorbike.png",
  width = 120,
}: Props) {
  const bikes = [
    { delay: 0, duration: 6 },
    { delay: 2, duration: 8 },
    { delay: 4, duration: 7 },
  ];

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Track line — stationary */}
      <div
        className="absolute left-0 w-full h-1 bg-gray-700 opacity-30 rounded-full"
        style={{ top: "64vh" }}
      />

      {/* Bikes with smooth neon trails */}
      {bikes.map((bike, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: "51vh" }} // bike position
          initial={{ x: "-20vw" }}
          animate={{ x: "120vw" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: bike.duration,
            ease: "linear",
            delay: bike.delay,
          }}
        >
          {/* Motorcycle image */}
          <img src={src} alt="Motorbike" width={width} className="relative z-10" />

          {/* Smooth neon trail — continuous */}
          <div
            className="absolute h-1 rounded-full"
            style={{
              top: "110px",
              marginLeft: "-70px",
              width: "150px",
              background: "linear-gradient(to right, #00ffff, transparent)",
              filter: "blur(3px)",
              opacity: 0.6,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import ImageBlock from "./ImageBlock";
import { IconMotorbike } from "@tabler/icons-react";
import { ArrowBigRight, Columns3Cog, Columns3CogIcon, Rotate3d } from "lucide-react";
import Link from "next/link";

const details = [
  {
    id: 1,
    icon: <IconMotorbike />,
    title: "Attachs to any motorcycle",
  },
  {
    id: 2,
    icon: <Columns3CogIcon />,
    title: "No adjusting needed",
  },
  {
    id: 3,
    icon: <Rotate3d />,
    title: "9-axis motion sensors",
  },
];

export default function SensorsCta() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex flex-row items-center w-[75%] z-10 font-['Montserrat',sans-serif] gap-10">
      <div className="flex-shrink-0">
        <h1 className="text-5xl font-medium text-white mb-6">
          Compact yet strong
        </h1>
        <p className="text-2xl font-normal text-gray-500 mb-20 max-w-lg">
          Attach RVN in seconds and ride smarter. No installs, no wires—just
          pure data. Its 9-axis sensors read every lean and acceleration,
          turning motion into precision riding insight.
        </p>
        <div className="flex flex-row gap-6 mb-6">
          {details.map((detail) => (
            <div key={detail.id} className="flex flex- items-center gap-4 mb-6">
              <div className="text-purple-400">{detail.icon}</div>
              <h3 className="text-md font-extralight text-white max-w-40">
                {detail.title}
              </h3>
            </div>
          ))}
        </div>
        <Link href="/waitlist">
          <button className="cursor-pointer flex items-center justify-center px-12 py-4 rounded-md font-medium text-black bg-white transition-all duration-300 hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] shadow-md hover:shadow-lg">
            EXPLORE SENSORS
            <ArrowBigRight />
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-row gap-4 justify-center items-baseline w-full">
          <ImageBlock width={450} height={450} />
          <ImageBlock width={450} height={450} />
        </div>
        <ImageBlock width={920} height={450} />
      </div>
    </section>
  );
}

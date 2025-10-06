"use client";

import Link from "next/link";



export default function Hero() {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />

      <section className="relative h-screen w-full flex items-center overflow-hidden px-6 font-['Montserrat',sans-serif]">
        {/* Content */}
        <div className="relative z-20 flex flex-col items-start ml-10 mb-40 justify-center text-white max-w-[90%] sm:max-w-[600px] lg:max-w-[800px] xl:ml-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-light leading-tight">
            <span className="block lg:inline">Turn Data Into Dominance.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-6 text-blue-300 max-w-[600px]">
            The world’s first AI track coach built for performance.
          </p>
        <Link href="/waitlist">
          <button className="hidden mt-10 md:inline-flex items-center justify-center px-10 py-3 rounded-md text-2xl font-medium text-white bg-violet-500 transition-all duration-300 hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] shadow-md hover:shadow-lg">
            Join RVN
          </button>
        </Link>
        </div>
      </section>
    </>
  );
}

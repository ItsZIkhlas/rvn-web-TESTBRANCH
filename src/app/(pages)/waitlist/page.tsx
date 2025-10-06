"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { supabase } from "@/lib/supabase";

const WaitlistPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [spotsLeft, setSpotsLeft] = useState(0);
  const [position, setPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch available spots on mount
  useEffect(() => {
    const fetchSpots = async () => {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (!error) {
        setSpotsLeft(Math.max(0, 10000 - (count ?? 0)));
      }
    };
    fetchSpots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setPosition(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setPosition(data.position);
        setMessage(`You’ve joined the waitlist! Check your email.`);
        setEmail("");
        setSpotsLeft((prev) => Math.max(0, prev - 1));
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err: any) {
      console.error("Error submitting waitlist:", err);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6 font-['Montserrat',sans-serif]">
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

      {/* Gradient Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_60%)]" />

      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-violet-500 mb-4">
          Join the RVN Waitlist
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Be among the first to experience the world’s first AI-powered track
          coach. Sign up now and secure your spot for a board.
        </p>

        {/* Spots Left + Position */}
        <div className="mb-8">
          <p className="text-sm md:text-base font-medium text-gray-400">
            Only <span className="text-violet-400 font-bold">{spotsLeft}</span>{" "}
            spots left
          </p>
          {position && (
            <p className="text-sm md:text-base font-medium text-gray-400">
              Your position:{" "}
              <span className="text-violet-400 font-bold">#{position}</span>
            </p>
          )}
        </div>

        {/* Waitlist Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-400 font-medium">{message}</p>
        )}
      </motion.div>
    </main>
  );
};

export default WaitlistPage;

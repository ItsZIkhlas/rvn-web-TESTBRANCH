"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import { Button } from "@/registry/new-york-v4/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Gradient Hero Section */}

      {/* Fixed navbar wrapper */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      <section className="relative w-full bg-gradient-to-br from-violet-700/40 via-black to-blue-700/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.3),transparent_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Track Smarter. Ride Faster.
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Get the RVN device and unlock pro-level performance data — one-time
            purchase, lifetime access.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="cursor-pointer px-10 py-4 md:py-5 rounded-lg text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] shadow-md hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 cursor-pointer">
              <Link href="/waitlist">Join Waitlist</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-1 gap-10">
        {/* Pro */}
        <div className="bg-gradient-to-br from-violet-600/30 to-blue-600/30 rounded-3xl border border-violet-500/40 shadow-2xl p-10 flex flex-col hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl font-bold mb-4">RVN Software</h2>
          <p className="text-4xl font-extrabold mb-6">$50 / month</p>
          <ul className="space-y-3 text-gray-200 flex-1">
            <li>✅ Lap Timing</li>
            <li>✅ GPS Track Mapping</li>
            <li>✅ Speed & Sector Data</li>
            <li>✅ Lean Angle Tracking</li>
            <li>✅ Cloud Storage (early adopters only)</li>
            <li>✅ And more...</li>
          </ul>
          <Button className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 font-semibold text-white hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <PricingFAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}

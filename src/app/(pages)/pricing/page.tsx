import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import PricingCompare from "@/components/pricing/PricingCompare";
import PricingFAQ from "@/components/pricing/PricingFAQ";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black relative text-white overflow-hidden">
      {/* Neon Background Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_60%)]" />

      {/* Fixed Navbar */}
      <div className="fixed top-5 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>
      {/* Pricing Cards */}
      <PricingCards />

      {/* Feature Comparison Table */}
      <PricingCompare />

      {/* FAQ Section */}
      <PricingFAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}

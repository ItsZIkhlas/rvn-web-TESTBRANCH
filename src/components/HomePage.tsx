import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import NavBar from "./NavBar";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Neon fades */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_60%)]" />

      {/* Fixed navbar wrapper */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      <div className="pt-24">
        <Hero />
      </div>

      <div className="relative z-10">
        <FeaturesSection />
      </div>

      <div>
        <HowItWorks />
      </div>

      <div className="">
        <Testimonials />
      </div>

      <div className="">
        <CTASection />
      </div>

      <div className="">
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;

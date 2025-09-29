import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import MotorcycleRider from "./MotorcycleRider";
import NavBar from "./NavBar";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden z-2">
      {/* Neon fades behind everything */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_60%)] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_60%)] z-0" />

      {/* Fixed navbar */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      {/* Fullscreen video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted className="w-full object-cover h-[100vh]">
          <source src="/raven.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute z-1 inset-0 bg-black/70"></div>
      </div>

      {/* Content layered above video */}
      <div className="relative z-10 sm:pt-20 flex flex-col items-center justify-center gap-20">
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;

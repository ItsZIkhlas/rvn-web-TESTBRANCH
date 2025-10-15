import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import MotorcycleRider from "./MotorcycleRider";
import NavBar from "./NavBar";
import Push1 from "./Push1";
import RaceLevel from "./RaceLevels";
import SensorsCta from "./SensorsCTA";
import Testimonials from "./Testimonials";

const HomePage = () => {

  return (
    <main className="min-h-screen bg-black relative overflow-hidden z-2">
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.15),transparent_60%)] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,191,255,0.15),transparent_60%)] z-0" />

      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full object-cover h-[100vh]"
        >
          <source src="/raven.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      <div className="relative z-10 sm:pt-20 flex flex-col items-center justify-center gap-20">
        <Hero />
        <FeaturesSection />
        <Push1 />
        <RaceLevel />
        <SensorsCta />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;

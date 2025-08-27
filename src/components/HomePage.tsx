import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import NavBar from "./NavBar";

const HomePage = () => {
  return (
    <main className="bg-black">
      {/* Fixed navbar wrapper centered horizontally */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <NavBar />
      </div>

      {/* Hero section with padding so content doesn't go under navbar */}
      <div className="pt-24">
        <Hero />
      </div>

      <div className="z-51">
        <FeaturesSection />
      </div>

      <div className="">
        <HowItWorks />
      </div>

    </main>
  );
};

export default HomePage;

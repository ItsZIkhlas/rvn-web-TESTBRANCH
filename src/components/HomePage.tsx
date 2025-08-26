import Hero from "./Hero";
import NavBar from "./NavBar";

const HomePage = () => {
  return (
    <main className="bg-black">
      <div className="flex justify-center mt-4">
        <NavBar />
      </div>
      <Hero />
    </main>
  );
};

export default HomePage;

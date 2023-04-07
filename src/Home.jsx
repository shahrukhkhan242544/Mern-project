import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { useGlobalContext } from "./context";
import Services from "./Services";
import Contact from "./Contact";
import { Helmet } from "react-helmet";

const Home = () => {
  const { updateHomePage } = useGlobalContext();

  useEffect(() => updateHomePage(), []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HeroSection />
    </>
  );
};

export default Home;

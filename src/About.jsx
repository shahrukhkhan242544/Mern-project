import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "./components/HeroSection";
import { useGlobalContext } from "./context";

const About = () => {
  const { udpateAboutPage } = useGlobalContext();

  useEffect(() => udpateAboutPage(), []);

  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <HeroSection />
    </>
  );
};

export default About;

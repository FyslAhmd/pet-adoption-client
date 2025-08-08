import React from "react";
import Banner from "../Banner/Banner";
import HowItWork from "../HowItWork/HowItWork";
import SupportedBrand from "../SupportedBrand/SupportedBrand";
import FAQ from "../FAQ/FAQ";
import Review from "../Review/Review";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWork />
      <Review />
      <SupportedBrand />
      <FAQ />
    </div>
  );
};

export default Home;

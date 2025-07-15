import React from "react";
import Marquee from "react-fast-marquee";

import petfinder from "../../../assets/brands/petfinder.png";
import aspca from "../../../assets/brands/aspca.png";
import purina from "../../../assets/brands/purina.png";
import chewy from "../../../assets/brands/chewy.png";
import petsmart from "../../../assets/brands/petsmart.png";

const brands = [petfinder, aspca, purina, chewy, petsmart];

const SupportedBrand = () => {
  return (
    <div className="my-8 md:my-12 lg:my-16">
      <h2 className="text-3xl font-extrabold text-center mb-4">
        Supported by Trusted Pet Care Organizations
      </h2>
      <p className="text-center text-gray-600 mb-8 w-11/12 md:w-4/5 mx-auto">
        We collaborate with leading animal welfare groups and pet care companies
        to ensure a safe, reliable, and loving adoption experience for every
        pet.
      </p>

      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {brands.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`brand-${index}`}
            className="h-12 md:h-14 mx-16 w-auto object-contain  transition-all duration-300"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default SupportedBrand;

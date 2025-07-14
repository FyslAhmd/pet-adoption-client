import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/banner/banner1.svg";
import banner2 from "../../../assets/banner/2nd.svg";
import banner3 from "../../../assets/banner/3rd.svg";

const Banner = () => {
  return (
    <Carousel
      className="mt-2 mb-8 rounded-xl overflow-hidden shadow-lg"
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
    >
      <div className="">
        <img
          src={banner1}
          alt="Fast Delivery"
          className="md:h-[60vh] lg:h-[70vh] w-full object-cover"
        />
      </div>

      <div className="relative">
        <img
          src={banner2}
          alt="Tracking"
          className="md:h-[60vh] lg:h-[70vh] w-full object-cover"
        />
      </div>

      <div className="relative">
        <img
          src={banner3}
          alt="Nationwide Delivery"
          className="md:h-[60vh] lg:h-[70vh] w-full object-cover"
        />
      </div>
    </Carousel>
  );
};

export default Banner;

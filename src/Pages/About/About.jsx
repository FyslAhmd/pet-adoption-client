import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/aboutus.json";
import { Link } from "react-router";

const About = () => {
  return (
    <section className="relative z-10 mb-10 py-16 px-8 bg-white overflow-hidden rounded-xl">
      <div className="absolute -top-20 -left-40 w-[400px] h-[400px] bg-gray-400 opacity-30 rounded-full blur-3xl z-0"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        <div className="text-center lg:text-left space-y-6">
          <p className="text-black text-lg font-semibold uppercase tracking-widest">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-800">
            Find Loving Homes & Support{" "}
            <span className="text-green-500 underline underline-offset-4">
              Rescue Pets
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            ResQPet is a community-driven platform that connects rescued pets
            with caring adopters and reliable rescues. Our mission is to make
            rehoming simple, transparent, and compassionate so every animal
            can find a safe and loving forever home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              className="bg-black hover:scale-105 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200"
              to="/"
            >
              Explore Pets
            </Link>
            <Link
              to="/"
              className="group flex items-center text-green-700 font-semibold transition-all"
            >
              Discover by Map
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>

      <h1 className="hidden lg:block absolute text-[10rem] font-extrabold top-8 left-1/2 transform -translate-x-1/2 opacity-5 text-green-400 select-none z-0">
        ResQPet
      </h1>
    </section>
  );
};

export default About;

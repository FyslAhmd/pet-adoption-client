import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img src={logo} alt="" className=" w-8" />
        <p className="md:text-3xl font-bold text-[#a4b0e9] underline">
          ResQPet
        </p>
      </div>
    </Link>
  );
};

export default Logo;

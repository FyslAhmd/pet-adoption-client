import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo2.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img src={logo} alt="" className="h-10 md:h-14" />
      </div>
    </Link>
  );
};

export default Logo;

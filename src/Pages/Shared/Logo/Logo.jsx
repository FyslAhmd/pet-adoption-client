import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <p className="md:text-3xl font-bold">ResQPet</p>
      </div>
    </Link>
  );
};

export default Logo;

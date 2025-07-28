import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const handleLogOut = () => {
    logOutUser()
      .then((res) => {
        toast.error("Logged out from application");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navItems = (
    <>
      <NavLink className="text-base font-medium px-3 py-2" to="/">
        Home
      </NavLink>
      {user && (
        <>
          <NavLink className="text-base font-medium px-3 py-2" to="/dashboard">
            Dashboard
          </NavLink>
        </>
      )}
      <NavLink className="text-base font-medium px-3 py-2" to="/availableCoins">
        About Us
      </NavLink>
      <a
        href="https://github.com/FyslAhmd/pet-adoption-client"
        target="_blank"
        className="text-base font-medium px-3 py-2"
      >
        Join as Developer
      </a>
    </>
  );
  return (
    <div className="navbar rounded-xl backdrop-blur-2xl sticky top-0 z-[100]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center">
            <img
              src={user?.photoURL}
              alt=""
              className="w-12 h-12 rounded-full bg-white"
            />
            <button
              className="btn bg-primary rounded-full ml-2"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link className="btn rounded-full bg-transparent" to="/login">
              Sign In
            </Link>
            <Link className="btn bg-primary rounded-full ml-2" to="/register">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

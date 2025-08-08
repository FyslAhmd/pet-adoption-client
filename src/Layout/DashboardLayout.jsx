import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Pages/Shared/Logo/Logo";
import useUserRole from "../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoNotifications } from "react-icons/io5";
import {
  FaHome,
  FaClipboardList,
  FaRegPaperPlane,
  FaMoneyBillWave,
  FaTasks,
  FaClipboardCheck,
  FaCoins,
  FaReceipt,
  FaUsersCog,
  FaListAlt,
} from "react-icons/fa";
import Footer from "../Pages/Shared/Footer/Footer";
import LoadingPage from "../Pages/Shared/Loading/LoadingPage";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, isLoading: roleLoading } = useUserRole();

  // Get user info
  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/byEmail?email=${user?.email}`);
      return res.data;
    },
  });

  if (!user || roleLoading || userLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-white flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar w-full bg-base-100 shadow px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="text-lg md:text-3xl font-extrabold flex-1">
            <p className="hidden md:block">Dashboard</p>
          </div>
          <div className="flex items-center gap-4 relative">
            {/* User Info */}
            <div className="flex flex-col items-end">
              <p className="font-medium">
                {userData.name?.split(" ")[0]} | {userData.role}
              </p>
            </div>
            <div>
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full border"
              />
            </div>
            <div>
              <IoNotifications size={28} color="orange" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 min-h-full w-72 p-4 space-y-3">
          <Logo />
          <li className="text-lg font-bold">
            <NavLink to="/dashboard" end>
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>

          {/* Adopter */}
          {role === "adopter" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/browsePet">
                  <FaClipboardList className="mr-2" />
                  Browse Pet
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/mySubmissions">
                  <FaRegPaperPlane className="mr-2" />
                  My Submissions
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/withdrawals">
                  <FaMoneyBillWave className="mr-2" />
                  Withdrawals
                </NavLink>
              </li>
            </>
          )}

          {/* Rescuer */}
          {role === "rescuer" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/addNewPet">
                  <FaTasks className="mr-2" />
                  Add new Pet
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/myPets">
                  <FaClipboardCheck className="mr-2" />
                  My Pets
                </NavLink>
              </li>
            </>
          )}

          {/* Admin */}
          {/* {role === "admin" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/manageUsers">
                  <FaUsersCog className="mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/manageTasks">
                  <FaListAlt className="mr-2" />
                  Manage Tasks
                </NavLink>
              </li>
            </>
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

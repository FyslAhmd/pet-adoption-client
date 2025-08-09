import React from "react";
import useUserRole from "../../../Hooks/useUserRole";
import LoadingPage from "../../Shared/Loading/LoadingPage";
import AdopterHome from "../AdopterPage/AdopterHome/AdopterHome";
import RescuerHome from "../RescuerPages/RescuerHome/RescuerHome";
import AdminHome from "../AdminPage/AdminHome/AdminHome";
import Forbidden from "../../Shared/Forbidden/Forbidden";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <LoadingPage />;

  if (role === "adopter") {
    return <AdopterHome />;
  } else if (role === "rescuer") {
    return <RescuerHome />;
  } else if (role === "admin") {
    return <AdminHome />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;

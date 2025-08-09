import React from "react";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";
import LoadingPage from "../Pages/Shared/Loading/LoadingPage";

const AdopterRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <LoadingPage />;
  }

  if (!user || role !== "adopter") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdopterRoute;

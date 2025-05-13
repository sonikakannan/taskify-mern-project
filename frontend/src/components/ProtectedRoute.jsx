import React from "react";
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../redux/api/authApi";

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useGetMeQuery();

  if (isLoading) return <p>Loading...</p>;

  if (error || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

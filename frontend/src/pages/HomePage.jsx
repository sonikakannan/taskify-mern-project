import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default HomePage;

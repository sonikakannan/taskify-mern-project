import React from "react";
import Navbar from "../Navbar";
import SidebarMenu from "../SidebarMenu";
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex ">
        <div className=" hidden lg:flex">
          <SidebarMenu />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

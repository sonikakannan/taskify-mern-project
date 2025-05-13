import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../redux/api/authApi";
import { SIDE_MENU_DATA } from "../utils/data";
import { toast } from "react-toastify";

const SidebarMenu = () => {
  const [logout] = useLogoutMutation();
  const { data } = useGetMeQuery();
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // <- Get current location

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (data?.user) {
      setSideMenuData(SIDE_MENU_DATA);
    }
  }, [data?.user]);

  return (
    <div className="w-64 h-[calc(100vh)] bg-white border-r border-green-200/50  ">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={data?.user?.profileImageUrl || ""}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>
        <h5 className="text-green-950 font-medium leading-6 mt-3">
          {data?.user?.name || ""}
        </h5>
        <p className="text-[14px] text-gray-500">{data?.user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={`menu_${index}`}
            className={`w-full  flex items-center gap-4 text-[17px] py-3 px-6 cursor-pointer
              ${
                isActive
                  ? "text-blue-500  bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-[5px] border-blue-500 "
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SidebarMenu;

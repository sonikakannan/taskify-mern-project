import React, { useState, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="bg-white py-4 px-4  flex items-center justify-start">
      <button
        className="block lg:hidden text-gray-700 dark:text-gray-300 mr-4"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="h-6 w-6" />
        ) : (
          <HiOutlineMenu className="h-6 w-6" />
        )}
      </button>

      <span className="text-xl font-semibold text-gray-800 ">Taskify</span>

      {openSideMenu && (
        <div
          className="fixed top-[57px] left-0 w-full h-full bg-black/40 dark:bg-white/30  z-10 "
          onClick={() => setOpenSideMenu(false)}
        >
          <SidebarMenu
            activeMenu={activeMenu}
            onClose={() => setOpenSideMenu(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;

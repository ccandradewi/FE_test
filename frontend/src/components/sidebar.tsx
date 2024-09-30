"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hook";
import { logout } from "@/redux/slice";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleMasterGerbang = () => {
    router.push("/dashboard/gerbang");
  };
  const handleDashboard = () => {
    router.push("/dashboard");
  };
  const handleReport = () => {
    router.push("/dashboard/lalins");
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex z-50 tracking-tighter">
      <span
        className="sticky lg:hidden text-gray-600 text-4xl cursor-pointer"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu className="px-2 bg-gray-50 rounded-md" />
      </span>
      <div
        className={`fixed lg:static top-0 bottom-0 lg:flex lg:flex-col p-2 w-[300px] overflow-y-auto text-center bg-zinc-100 ${
          isSidebarOpen ? "" : "hidden lg:block"
        }`}
      >
        <div className=" text-xl">
          <div className="p-3 mt-2 flex items-center">
            <img
              src="https://ecatalog.jmtm.co.id/assets/landing_new/img/jmtmpng.png"
              alt="Logo"
              width={150}
            />
            <IoMdClose
              className="cursor-pointer ml-auto lg:hidden"
              onClick={toggleSidebar}
            />
          </div>
        </div>
        <hr />

        <div
          onClick={handleDashboard}
          className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer hover:bg-zinc-300 text-black"
        >
          <div className="text-xl">
            <FaHouse />
          </div>
          <span className="text-[15px] ml-4 font-semibold text-black hover:text-white ">
            Dashboard
          </span>
        </div>

        <div
          className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer  hover:bg-zinc-300  text-black"
          onClick={handleReport}
        >
          <div className="text-xl">
            <VscGraph />
          </div>
          <span className="text-[15px] ml-4 text-black font-semibold">
            Report Lalins
          </span>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer  hover:bg-zinc-300  text-black">
          <div className="text-xl">
            <IoIosSettings />
          </div>
          <span
            onClick={handleMasterGerbang}
            className="text-[15px] ml-4 text-black font-semibold"
          >
            Master Gerbang
          </span>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer  hover:bg-zinc-300  text-black"
          onClick={handleLogout}
        >
          {" "}
          <div className="text-xl">
            <IoLogOut />
          </div>
          <span className="text-[15px] ml-4 text-black font-semibold">
            Log out
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

import Link from "next/link";
import React from "react";
import LogOut from "./logOut";

const SideNav = () => {
  return (
    <div className="text-secondary font-bold text-xl flex flex-col items-center h-full">
      <div className=" w-[80%] mt-[3vh]">
        <img
          src="/UISS_LOGO.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <ul className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col gap-5 w-[70%] my-[3vh]">
          <li className="cursor-pointer">Dashboard</li>
          <li>Maintenance</li>
          {/* <Link href={"/AdminPanel/AdminPages/Explore"}>
            <li className="cursor-pointer">Explore</li>
          </Link> */}
          <Link href={"/AdminPanel/AdminPages/Users"}>
            <li className="cursor-pointer">Users</li>
          </Link>
          <Link href={"/AdminPanel/AdminPages/CoreValues"}>
            <li className="cursor-pointer">Core Values</li>
          </Link>
          <Link href={"/AdminPanel/AdminPages/Clubs"}>
            <li className="cursor-pointer">Clubs</li>
          </Link>
          <Link href={"/AdminPanel/AdminPages/Leaders"}>
            <li className="cursor-pointer">Leaders</li>
          </Link>
        </div>
        <LogOut/>
      </ul>
    </div>
  );
};

export default SideNav;

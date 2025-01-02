import Link from "next/link";
import React from "react";

const SideNav = () => {
  return (
    <div className="text-secondary font-bold text-xl flex flex-col items-center">
      <div className="w-[200px] h-[150px]">
        <img
          src="/UISS_LOGO.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <ul className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-5 w-[70%]">
          <li className="cursor-pointer">Dashboard</li>
          <li>Maintenance</li>
          <Link href={"/AdminPanel/AdminPages/Explore"}>
            <li className="cursor-pointer">Explore</li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default SideNav;

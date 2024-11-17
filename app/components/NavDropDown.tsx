import React from "react";
import { INavDropDown } from "./types";

interface props {
  className?: string;
  NavDetail: INavDropDown;
}

const NavDropDown:React.FC<props> = ({NavDetail, className}) => {
  return (
    <li className={`flex justify-center items-center gap-x-1 group cursor-pointer ${className}`}>
      <span className={`text-lg font-bold group-hover:text-[#efb631] ${NavDetail.name == 'Support Us' ? 'text-white group-hover:text-black':''}`}>
        {NavDetail.name}
      </span>
      {
        NavDetail.dropDown &&
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 group-hover:stroke-[#efb631]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      }
    </li>
  );
};

export default NavDropDown;

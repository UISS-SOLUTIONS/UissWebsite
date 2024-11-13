import React from "react";

interface props{
    name: string
}

const NavDropDown = ({name}:props) => {
  return (
    <li className="flex justify-center items-center gap-x-1 group cursor-pointer">
      <span className="text-lg font-bold group-hover:text-[#efb631]">{name}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 group-hover:stroke-[#efb631]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </li>
  );
};

export default NavDropDown;

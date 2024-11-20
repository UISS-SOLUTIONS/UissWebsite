import React from "react";
import { INavDropDown } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface props {
  className?: string;
  NavDetail: INavDropDown;
}

const NavDropDown: React.FC<props> = ({ NavDetail, className }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
          <li
            className={`text-white flex justify-center items-center gap-x-1 group cursor-pointer ${className}`}
          >
            <span
              className={`text-lg font-bold group-hover:text-[#efb631] ${
                NavDetail.name == "Support Us"
                  ? "text-white group-hover:text-black"
                  : ""
              }`}
            >
              {NavDetail.name}
            </span>
            {NavDetail.dropDown && (
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
            )}
          </li>
        </DropdownMenuTrigger>
        {NavDetail.children != undefined ? (
          <DropdownMenuContent className=" font-bold">
            {NavDetail.children.map((children, index) => {
              if (children.children != undefined) {
                return (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {children.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {children.children.map((children) => {
                          return (
                            <DropdownMenuItem key={children.id}>
                              {children.name}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                );
              }
              return (
                <DropdownMenuItem key={children.id}>
                  {children.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        ) : (
          ""
        )}
      </DropdownMenu>
    </>
  );
};

export default NavDropDown;

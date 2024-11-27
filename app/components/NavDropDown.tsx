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
import Link from "next/link";

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
              {NavDetail.children != undefined ? (
                <span>{NavDetail.name}</span>
              ) : (
                <Link href={NavDetail.link || "#"}>{NavDetail.name}</Link>
              )}
            </span>
            {/* {NavDetail.dropDown && (
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
            )} */}
          </li>
        </DropdownMenuTrigger>
        {NavDetail.children != undefined ? (
          <DropdownMenuContent className=" font-bold">
            {NavDetail.children.map((children) => {
              if (children.children != undefined) {
                return (
                  <DropdownMenuSub key={children.id}>
                    <DropdownMenuSubTrigger>
                      {children.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {children.children.map((children) => {
                          return (
                            <Link href={children.link || '#'} key={children.id}>
                              <DropdownMenuItem>
                                {children.name}
                              </DropdownMenuItem>
                            </Link>
                          );
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                );
              }
              return (
                <Link href={children.link || '#'} key={children.id}>
                  <DropdownMenuItem>
                    {children.name}
                  </DropdownMenuItem>
                </Link>
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

import Image from "next/image";
import React from "react";
import UissLogo from "@/public/logoUISS.png";
import UdsmLogo from "@/public/Udsm.png";
import NavDropDown from "./NavDropDown";
import { INavDropDown } from "./types";

const NavBar = () => {
  const NavLinks: INavDropDown[] = [
    {
      id: 19,
      name: "Home",
    },
    {
      id: 20,
      name: "Events",
    },
    {
      id: 21,
      name: "About",
    },
    {
      id: 22,
      name: "Podcast",
    },
    {
      id: 23,
      name: "Programmes",
    },
    {
      id: 24,
      name: "Support Us",
    },
  ];
  return (
    <nav className="flex justify-center items-center border-b-[1px] border-white/10 py-3 absolute top-0 w-full z-50">
      <div className="container flex justify-between items-center">
        <div className="grid grid-cols-2 divide-x-2 gap-x-4">
          <Image src={UissLogo} height={80} width={85} alt="Uiss Logo" />
          <Image src={UdsmLogo} height={70} width={90} alt="Udsm Logo" className="pl-4"/>
        </div>
        <div>
          <ul className="list-none flex gap-x-6">
            {NavLinks.map((NavLink) => {
              if (NavLink.name == "Support Us") {
                return (
                  <NavDropDown
                    NavDetail={NavLink}
                    key={NavLink.id}
                    className="bg-[#efb631] px-3 py-1 rounded-md"
                  />
                );
              } else {
                return <NavDropDown NavDetail={NavLink} key={NavLink.id} />;
              }
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

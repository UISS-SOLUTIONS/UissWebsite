import Image from "next/image";
import React from "react";
import UissLogo from "@/public/logoUISS.png";
import NavDropDown from "./NavDropDown";

const NavBar = () => {
  const NavLinks: string[] = [
    "Home",
    "Events",
    "About",
    "Podcast",
    "Programmes",
    "Support Us",
  ];
  return (
    <nav className="flex justify-center items-center border-b-[1px] border-white/10 py-3 absolute top-0 w-full z-50">
      <div className="container flex justify-between items-center">
        <div>
          <Image src={UissLogo} height={70} width={70} alt="Uiss Logo" />
        </div>
        <div>
          <ul className="list-none flex gap-x-6">
            {NavLinks.map((NavLink, index: number) => (
              <NavDropDown name={NavLink} key={index}/>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

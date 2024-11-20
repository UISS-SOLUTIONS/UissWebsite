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
      name: "Explore",
      children: [
        {
          id: 191,
          name: "Welcome Note",
        },
        {
          id: 192,
          name: "Vision and Mission",
        },
        { id: 193, name: "Core Values" },
        { id: 194, name: "Awards and Achievements" },
        { id: 195, name: "Constitution" },
        { id: 196, name: "Governance / team" },
        { id: 197, name: "Collaboration and Networks" },
      ],
    },
    {
      id: 21,
      name: "Programmes",
      children: [
        {
          id: 211,
          name: "Podcast",
        },
        {
          id: 212,
          name: "Clubs",
          children: [
            {
              id: 2121,
              name: "Software Development Club",
            },
            {
              id: 2122,
              name: "UI / UX Designing",
            },{
              id: 2123,
              name: "Cybersecurity Club",
            },{
              id: 2124,
              name: "Artificial Intelligence Club",
            },{
              id: 2125,
              name: "Networking Club",
            },{
              id: 2126,
              name: "Data Science Club",
            },
          ],
        },
        { id: 213, name: "Initiatives" },
      ],
    },
    {
      id: 22,
      name: "Events",
      children: [
        { id: 221, name: "Annual Timetable" },
        { id: 222, name: "Upcoming Events" },
        { id: 223, name: "Annual Highlights" },
      ],
    },
    {
      id: 23,
      name: "News",
      children: [
        { id: 231, name: "Gallery" },
        { id: 232, name: "Updates" },
      ],
    },
    {
      id: 24,
      name: "Membership",
      children: [
        {id: 241, name: "Benefits"}
      ]
    },
    {
      id: 25,
      name: "Support Us",
    },
  ];
  return (
    <nav className="flex justify-center items-center border-b-[1px] border-white/10 py-3 absolute top-0 w-full z-50">
      <div className="container flex justify-between items-center">
        <div className="grid grid-cols-2 divide-x-2 gap-x-4">
          <Image src={UissLogo} height={80} width={85} alt="Uiss Logo" />
          <Image
            src={UdsmLogo}
            height={70}
            width={90}
            alt="Udsm Logo"
            className="pl-4"
          />
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

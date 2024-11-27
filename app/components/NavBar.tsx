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
      link: "/"
    },
    {
      id: 20,
      name: "Explore",
      children: [
        {
          id: 191,
          name: "Welcome Note",
          link: "/Explore",
        },
        {
          id: 192,
          name: "Vision and Mission",
          link: "/Explore",
        },
        { id: 193, name: "Core Values",link: "/Explore", },
        { id: 194, name: "Awards and Achievements", link: "/Explore", },
        { id: 195, name: "Constitution", link: "/Constitution", },
        { id: 196, name: "Governance / team", link: "/Explore", },
        { id: 197, name: "Collaboration and Networks", link: "/Explore", },
      ],
    },
    {
      id: 21,
      name: "Programmes",
      children: [
        {
          id: 211,
          name: "Podcast",
          link: "/Podcast",
        },
        {
          id: 212,
          name: "Clubs",
          children: [
            {
              id: 2121,
              name: "Software Development Club",
              link: "/Programs/Clubs/software",
            },
            {
              id: 2122,
              name: "UI / UX Designing",
              link: "Programs/Clubs/ui",
            },{
              id: 2123,
              name: "Cybersecurity Club",
              link: "Programs/Clubs/cybersecurity",
            },{
              id: 2124,
              name: "Artificial Intelligence Club",
              link: "Programs/Clubs/artificialintelligence",
            },{
              id: 2125,
              name: "Networking Club",
              link: "Programs/Clubs/networking",
            },{
              id: 2126,
              name: "Data Science Club",
              link: "Programs/Clubs/datascience",
            },
          ],
        },
        { id: 213, name: "Initiatives",link: "/Podcast", },
      ],
    },
    {
      id: 22,
      name: "Events",
      children: [
        { id: 221, name: "Annual Timetable",link: "/Events", },
        { id: 222, name: "Upcoming Events",link: "/Events", },
        { id: 223, name: "Annual Highlights",link: "/Events", },
      ],
    },
    {
      id: 23,
      name: "News",
      children: [
        { id: 231, name: "Gallery",link: "/News" },
        { id: 232, name: "Updates", link: "/News" },
      ],
    },
    {
      id: 24,
      name: "Membership",
      children: [
        {id: 241, name: "Benefits", link: "/Membership"},
        {id: 242, name: "Sign Up", link: "/Membership"},
      ]
    },
    {
      id: 25,
      name: "Support Us",
      link: "/SupportUs"
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

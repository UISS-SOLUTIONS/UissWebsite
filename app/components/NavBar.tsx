"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import UissLogo from "@/public/logoUISS.png";
import UdsmLogo from "@/public/Udsm.png";
import NavDropDown from "./NavDropDown";
import { INavDropDown } from "./types";

const NavBar = () => {
  const NavLinks: INavDropDown[] = [
    {
      id: 19,
      name: "Home",
      link: "/",
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
          link: "/Explore/#ExploreVisionMission",
        },
        { id: 193, name: "Core Values", link: "/Explore/#ExploreCoreValues" },
        {
          id: 194,
          name: "Awards and Achievements",
          link: "/Explore/#ExploreAwardsAchivements",
        },
        { id: 195, name: "Constitution", link: "/Constitution" },
        {
          id: 196,
          name: "Governance / team",
          link: "/Explore/#ExploreGovernance",
        },
        { id: 197, name: "Collaboration and Networks", link: "/Explore" },
      ],
    },
    {
      id: 21,
      name: "Programmes",
      children: [
        {
          id: 211,
          name: "Podcast",
          link: "/ComingSoon",
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
              link: "/Programs/Clubs/ui",
            },
            {
              id: 2123,
              name: "Cybersecurity Club",
              link: "/Programs/Clubs/cybersecurity",
            },
            {
              id: 2124,
              name: "Artificial Intelligence Club",
              link: "/Programs/Clubs/artificialintelligence",
            },
            {
              id: 2125,
              name: "Networking Club",
              link: "/Programs/Clubs/networking",
            },
            {
              id: 2126,
              name: "Data Science Club",
              link: "/Programs/Clubs/datascience",
            },
          ],
        },
        { id: 213, name: "Initiatives", link: "/ComingSoon" },
      ],
    },
    {
      id: 22,
      name: "Events",
      children: [
        { id: 221, name: "Annual Timetable", link: "/ComingSoon" },
        { id: 222, name: "Upcoming Events", link: "/#UpcomingEvents" },
        { id: 223, name: "Annual Highlights", link: "/ComingSoon" },
      ],
    },
    {
      id: 23,
      name: "News",
      children: [
        { id: 232, name: "Updates", link: "/News" },
        { id: 231, name: "Gallery", link: "/News/#Gallery" },
      ],
    },
    {
      id: 24,
      name: "Membership",
      children: [
        { id: 241, name: "Benefits", link: "/Membership" },
        { id: 242, name: "Sign Up", link: "/ComingSoon" },
      ],
    },
    {
      id: 25,
      name: "Support Us",
      link: "/ComingSoon",
    },
    {
      id: 26,
      name: "Admin",
      link: "/AdminPanel",
    },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex justify-center items-center border-b-[1px] border-white/10  top-0 w-full z-50 sticky h-[10vh] ${
        isScrolled ? "backdrop-blur-md bg-black/30 shadow-md" : ""
      }`}
    >
      <div className="container flex justify-between items-center">
        <div>
          <Image
            src={UdsmLogo}
            height={70}
            width={90}
            alt="Udsm Logo"
            className="pl-4"
          />
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-8 fill-secondary">
          <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
        </svg>
          <ul className="hidden list-none md:flex flex-col md:flex-row gap-x-6">
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
        <div>
          <Image src={UissLogo} height={80} width={85} alt="Uiss Logo" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

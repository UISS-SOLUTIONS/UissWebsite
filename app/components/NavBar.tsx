"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import UissLogo from "@/public/logoUISS.png";
import UdsmLogo from "@/public/Udsm.png";
import NavDropDown from "./NavDropDown";
import { IClubsData, INavDropDown } from "./types";
import { fetchData } from "../actions";
import { IErrorFormat } from "../(pages)/types";

const NavBar = () => {
  const [clubs, setclubs] = useState<IClubsData[] | IErrorFormat>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchClubsData = async () => {
      const { data } = await fetchData<IClubsData[] | IErrorFormat>(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/clubs`
      );
      if (Array.isArray(data)) {
        const clubs = data.map((club) => ({
          ...club,
          link: `/Programs/Clubs/${club.id}`,
        }));
        setclubs(clubs);
      } else {
        setclubs(data);
      }
    };

    fetchClubsData();
  }, []);

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

  const NavLinks: INavDropDown[] = [
    { id: 19, title: "Home", link: "/" },
    {
      id: 20,
      title: "Explore",
      children: [
        { id: 191, title: "Welcome Note", link: "/Explore" },
        { id: 192, title: "Vision and Mission", link: "/Explore/#ExploreVisionMission" },
        { id: 193, title: "Core Values", link: "/Explore/#ExploreCoreValues" },
        { id: 194, title: "Awards and Achievements", link: "/Explore/#ExploreAwardsAchivements" },
        { id: 195, title: "Constitution", link: "/Constitution" },
        { id: 196, title: "Governance / team", link: "/Explore/#ExploreGovernance" },
        { id: 197, title: "Collaboration and Networks", link: "/Explore" },
      ],
    },
    {
      id: 21,
      title: "Programmes",
      children: [
        { id: 211, title: "Podcast", link: "/ComingSoon" },
        {
          id: 212,
          title: "Clubs",
          children: Array.isArray(clubs)
            ? clubs
            : [{ id: 1, title: clubs.message, link: "#" }],
        },
        { id: 213, title: "Initiatives", link: "/ComingSoon" },
      ],
    },
    {
      id: 22,
      title: "Events",
      children: [
        { id: 221, title: "Annual Timetable", link: "/ComingSoon" },
        { id: 222, title: "Upcoming Events", link: "/#UpcomingEvents" },
        { id: 223, title: "Annual Highlights", link: "/ComingSoon" },
      ],
    },
    {
      id: 23,
      title: "News",
      children: [
        { id: 232, title: "Updates", link: "/News" },
        { id: 231, title: "Gallery", link: "/News/#Gallery" },
      ],
    },
    {
      id: 24,
      title: "Membership",
      children: [
        { id: 241, title: "Benefits", link: "/Membership" },
        { id: 242, title: "Sign Up", link: "/ComingSoon" },
      ],
    },
    { id: 25, title: "Support Us", link: "/ComingSoon" },
    { id: 26, title: "Admin", link: "/AdminPanel" },
  ];

  return (
    <nav
      className={`flex justify-center items-center border-b-[1px] border-white/10 top-0 w-full z-50 sticky h-[10vh] ${
        isScrolled ? "backdrop-blur-md bg-black/30 shadow-md" : ""
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Left logo */}
        <div>
          <Image
            src={UdsmLogo}
            height={70}
            width={90}
            alt="Udsm Logo"
            className="pl-4"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="list-none flex flex-row gap-x-6">
            {NavLinks.map((NavLink) => {
              if (NavLink.title === "Support Us") {
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

        {/* Mobile Toggle */}
        <div className="md:hidden pr-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Right logo */}
        <div>
          <Image src={UissLogo} height={80} width={85} alt="Uiss Logo" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-black z-40 px-6 py-4 shadow-lg space-y-4 md:hidden">
          {NavLinks.map((NavLink) => {
            if (NavLink.children) {
              return (
                <div key={NavLink.id}>
                  <p className="text-white font-semibold">{NavLink.title}</p>
                  <ul className="pl-4 space-y-2">
                    {NavLink.children.map((child) => (
                      <li key={child.id}>
                        <a href={child.link} className="text-gray-300 hover:text-white">
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            } else {
              return (
                <div key={NavLink.id}>
                  <a href={NavLink.link} className="text-white font-semibold block">
                    {NavLink.title}
                  </a>
                </div>
              );
            }
          })}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

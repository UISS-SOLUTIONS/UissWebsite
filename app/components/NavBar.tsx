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
  const NavLinks: INavDropDown[] = [
    {
      id: 19,
      title: "Home",
      link: "/",
    },
    {
      id: 20,
      title: "Explore",
      children: [
        {
          id: 191,
          title: "Welcome Note",
          link: "/Explore",
        },
        {
          id: 192,
          title: "Vision and Mission",
          link: "/Explore/#ExploreVisionMission",
        },
        { id: 193, title: "Core Values", link: "/Explore/#ExploreCoreValues" },
        {
          id: 194,
          title: "Awards and Achievements",
          link: "/Explore/#ExploreAwardsAchivements",
        },
        { id: 195, title: "Constitution", link: "/Constitution" },
        {
          id: 196,
          title: "Governance / team",
          link: "/Explore/#ExploreGovernance",
        },
        { id: 197, title: "Collaboration and Networks", link: "/Explore" },
      ],
    },
    {
      id: 21,
      title: "Programmes",
      children: [
        {
          id: 211,
          title: "Podcast",
          link: "/ComingSoon",
        },
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
    {
      id: 25,
      title: "Support Us",
      link: "/ComingSoon",
    },
    {
      id: 26,
      title: "Admin",
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="size-8 fill-secondary"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
          <ul className="hidden list-none md:flex flex-col md:flex-row gap-x-6">
            {NavLinks.map((NavLink) => {
              if (NavLink.title == "Support Us") {
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

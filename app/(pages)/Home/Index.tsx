import React from "react";
import ItStartsWithYou from "./ItStartsWithYou/ItStartsWithYou";
import Events from "./HomeEvents/Events";
import Sponsors from "./Sponsors/Sponsors";
import Programmes from "./Programmes/Programmes";
import Testimonials from "./Testimonials/Testimonals";
import Quote from "./Quote/Quote";
import Link from "next/link";
import { fetchData } from "@/app/actions";
import { IEventCard, IHomePage } from "../types";

const Index = async () => {
  const {data} = await fetchData<IHomePage>(`${process.env.NEXT_PUBLIC_API_ROUTE}/heroPage/homepage`)
  const {data: events} = await fetchData<IEventCard[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}/events`)

  return (
    <>
      <div className="w-full h-[100vh] relative -mt-[10vh]">
        <img
          src={data.backgroundImg}
          alt="coict pic"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/80 absolute w-full h-[100vh] top-0 " />
        <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[90%] md:w-fit">
          <h1 className="text-4xl font-bold md:text-7xl ">
            {data.heading}
            <span className="flex justify-center text-[#efb631]">
              {data.subheading}
            </span>
          </h1>
          <p className="text-center text-xl opacity-80 py-8">
            {data.description}
          </p>
          <Link href={"#HomeProgrammes"}>
            <button className="text-xl px-4 py-2 bg-[#efb631] text-black font-bold rounded-lg">
              View Programmes
            </button>
          </Link>
        </div>
      </div>
      <ItStartsWithYou />
      <Programmes />
      <Quote />
      <Events Events={events} />
      <Testimonials />
      <Sponsors />
    </>
  );
};

export default Index;

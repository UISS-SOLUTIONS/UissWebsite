import React from "react";
import ItStartsWithYou from "./ItStartsWithYou/ItStartsWithYou";
import Events from "./HomeEvents/Events";
import Sponsors from "./Sponsors/Sponsors";
import Programmes from "./Programmes/Programmes";
import Testimonials from "./Testimonials/Testimonals";
import Quote from "./Quote/Quote";
import CallToAction from "@/app/components/CallToAction";

const Index = () => {
  return (
    <>
      <div className="w-full h-[95vh] relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1681494379901-6dc30090cd1b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="coict pic"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/80 absolute w-full h-[95vh] top-0 " />
        <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <h1 className="text-7xl font-bold">
            Empowering Futures,
            <span className="flex justify-center text-[#efb631]">
              One Step at a Time.
            </span>
          </h1>
          <p className="text-center text-xl opacity-80 py-8">
            Where ambition meets opportunity and potential turns into success.
            At UISS, we empower students to connect, grow, and make a difference
            in their communities and beyond.
            <span className="flex justify-center">
              Your journey starts here.
            </span>
          </p>
          <CallToAction className="text-xl px-4 py-2 bg-[#efb631] text-black font-bold rounded-lg" name="View Programmes"/>
        </div>
      </div>
      <ItStartsWithYou />
      <Programmes />
      <Quote />
      <Events />
      <Testimonials />
      <Sponsors />
    </>
  );
};

export default Index;

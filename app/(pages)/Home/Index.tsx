import React from "react";
import ItStartsWithYou from "./ItStartsWithYou/ItStartsWithYou";
import Events from "./HomeEvents/Events";
import Sponsors from "./Sponsors/Sponsors";
import Programmes from "./Programmes/Programmes";
import Testimonials from "./Testimonials/Testimonals";
import Quote from "./Quote/Quote";

const Index = () => {
  return (
    <>
      <div className="w-full h-[90vh]">
        <img
          src="https://plus.unsplash.com/premium_photo-1681494379901-6dc30090cd1b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="coict pic"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/70 absolute w-full h-[90vh] top-0 " />
      </div>
      <ItStartsWithYou />
      <Quote/>
      <Programmes/>
      <Events />
      <Testimonials/>
      <Sponsors/>
    </>
  );
};

export default Index;

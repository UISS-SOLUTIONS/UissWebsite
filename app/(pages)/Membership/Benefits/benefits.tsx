import React from "react";
import BenefitCard from "../components/benefitCard";
import { IBenefitCard } from "../../types";
import { AlertDialogDemo } from "../../../components/alert";

const Benefits = () => {
  const benefits: IBenefitCard[] = [
    { id: 90, title: "Meet Experts from different fields" },
    { id: 91, title: "Learn and Build New Skills" },
    { id: 92, title: "Work on real life and Exciting Projects" },
    { id: 93, title: "Showcase Your Talents and grow your cycle" },
    { id: 94, title: "Be Part of a Supportive Community" },
    { id: 95, title: "Get Exclusive Member Perks" },
  ];
  return (
    <section className="flex justify-center pt-[11vh]">
      <div className="w-[1161px] pb-14">
        <div className="flex justify-between items-center">
          <span className="text-5xl font-bold flex border-b-2 border-primary/30 w-fit pb-3">
            Membership Benfits
          </span>
          <AlertDialogDemo btnTitle="Sign Up" dialogTitle="Hello" className="text-xl px-8 py-2 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-3 h-fit">
            <>
            </>
          </AlertDialogDemo>
        </div>
        <div className="grid grid-cols-2 gap-y-10 py-10">
          {benefits.map((benefit, index) => (
            <BenefitCard benefit={benefit} benefitNo={index + 1} key={benefit.id}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

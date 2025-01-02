"use client";
import React from "react";
import { useUpdatesStore } from "@/app/states/store";
import CallToAction from "@/app/components/CallToAction";
import AutoSlider from "@/app/components/AutoSlider";

const News = () => {
  const selectedUpdate = useUpdatesStore((s) => s.selectedUpdate);
  const updates = useUpdatesStore((s) => s.updates);
  return (
    <section className="flex flex-col justify-center items-center relative h-[100vh] -mt-[10vh]">
      <div className="w-full h-full absolute">
        <img
          src={selectedUpdate.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full bg-black/85" />
        <div className={`flex justify-center z-10 `}>
          <div className="w-[1200px]">

      <AutoSlider>
        {updates.map((update, index) => (
            <div className={`flex flex-col gap-10 justify-between w-full keen-slider__slide number-slide${(index+1).toString()}`} key={update.id}>

            <span className="text-5xl font-bold text-white">
              {update.title}
            </span>
            <p className="text-secondary/60 text-lg w-[90%]">
              {selectedUpdate.description}
            </p>
            <div className="flex justify-between items-center">
              <CallToAction
                className="text-xl px-8 py-2 bg-[#efb631] text-black font-bold rounded-lg w-fit h-fit"
                name="Read More"
              />
              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  className="size-8 stroke-ternary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="font-bold text-lg text-ternary">
                  {selectedUpdate.date}
                </span>
              </div>
            </div>
            </div>
        ))}
      </AutoSlider>
        </div>
          </div>
    </section>
  );
};
export default News;

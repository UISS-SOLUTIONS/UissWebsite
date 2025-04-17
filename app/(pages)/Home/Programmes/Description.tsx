"use client";
import React, { useState } from "react";

interface props {
  description: string;
  vision: string;
  mission: string;
  title: string;
}

const Description: React.FC<props> = ({ description,vision, mission,title }) => {
  const [About, setAbout] = useState<boolean>(true);
  const [Mission, setMission] = useState<boolean>();
  const [Vision, setVision] = useState<boolean>();
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-2xl font-bold mt-8 border-l-[3px] pl-3 border-[#efb631] uppercase">{title}</div>
      <div className=" flex-1 flex flex-col items-center md:items-start">
        <ul className="flex gap-10 py-4 text-xl font-bold">
          <li
            className={`cursor-pointer ${
              About && "border-b-[3px] border-[#efb631]"
            }`}
            onClick={() => {
              setMission(false);
              setVision(false);
              setAbout(true);
            }}
          >
            About
          </li>
          <li
            className={`cursor-pointer ${
              Mission && "border-b-[3px] border-[#efb631]"
            }`}
            onClick={() => {
              setAbout(false);
              setVision(false);
              setMission(true);
            }}
          >
            Mission
          </li>
          <li
            className={`cursor-pointer ${
              Vision && "border-b-[3px] border-[#efb631]"
            }`}
            onClick={() => {
              setMission(false);
              setAbout(false);
              setVision(true);
            }}
          >
            Vision
          </li>
        </ul>
        {About && (
          <p className="text-base text-justify w-[95%] opacity-70">
            {description}
            
          </p>
        )}
        {Mission && (
          <p className="text-base text-justify w-[95%] opacity-70">
            {mission}
          </p>
        )}
        {Vision && (
          <p className="text-base text-justify w-[95%] opacity-70">
            {vision}
          </p>
        )}
      </div>
      <button className="mb-8 bg-[#efb631] w-fit py-2 px-4 text-black font-bold rounded-lg">
        View Programme
      </button>
    </div>
  );
};

export default Description;

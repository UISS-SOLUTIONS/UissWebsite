"use client";
import React, { useState } from "react";

interface props {
  description: IProgrammeDescription;
}

const Description:React.FC<props> = ({description}) => {
  const [About, setAbout] = useState<boolean>(true);
  const [Mission, setMission] = useState<boolean>();
  const [Vision, setVision] = useState<boolean>();

  return (
      <div className="flex flex-col justify-between items-center h-full">
        <div>

        <ul className="flex gap-10 pb-4 pt-8 text-2xl font-bold">
          <li
            className={`cursor-pointer ${About && 'border-b-[3px] border-[#efb631]'}`}
            onClick={() => {
              setMission(false);
              setVision(false);
              setAbout(true);
            }}
          >
            About
          </li>
          <li
          className={`cursor-pointer ${Mission && 'border-b-[3px] border-[#efb631]'}`}
            onClick={() => {
              setAbout(false);
              setVision(false);
              setMission(true);
            }}
          >
            Mission
          </li>
          <li
          className={`cursor-pointer ${Vision && 'border-b-[3px] border-[#efb631]'}`}
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
            {description.about}
            
          </p>
        )}
        {Mission && (
          <p className="text-base text-justify w-[95%] opacity-70">
            {description.mission}
            
          </p>
        )}
        {Vision && (
          <p className="text-base text-justify w-[95%] opacity-70">
            {description.vision}
            
          </p>
        )}
        </div>
        <button className="mb-8 bg-[#efb631] w-fit py-2 px-4 text-black font-bold rounded-lg">View Programme</button>
      </div>
  );
};

export default Description;

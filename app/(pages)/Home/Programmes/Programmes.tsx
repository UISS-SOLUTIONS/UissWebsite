import React from "react";
import EventCard from "../HomeComponents/EventCard";
import Description from "./Description";

const Programmes = () => {
  return (
    <div className="bg-white flex justify-center items-center py-20 text-black">
      <div className="w-[1161px]">
        <span className=" flex text-4xl cursor-pointer font-semibold border-b-[1px] border-black/30  pb-4 mb-4 text-black">
          Explore our programmes
        </span>
        <div className="bg-black w-full h-[50vh] rounded-2xl mt-10">
          <div className="flex gap-5 px-3 text-white h-full">
            <div className="w-[55%] aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/U6fC4Ij608A"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="object-cover"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <Description/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programmes;

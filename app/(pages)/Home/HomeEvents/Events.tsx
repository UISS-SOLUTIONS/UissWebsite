import React from "react";
import EventCard from "../HomeComponents/EventCard";

const Events = () => {
  return (
    <div className="bg-white flex justify-center items-center py-20 text-black">
      <div className="w-[75%]">
        <span className=" flex text-4xl cursor-pointer font-semibold border-b-[1px] border-black/30  pb-4 mb-4d">
          Upcoming Events
        </span>
        <div className="grid grid-cols-3 gap-16">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;

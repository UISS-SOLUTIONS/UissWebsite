import React from "react";
import EventCard from "../HomeComponents/EventCard";
import { IEvents } from "@/app/AdminPanel/types";

interface props {
  Events?: IEvents[];
}

const Events: React.FC<props> = ({ Events = [] }) => {
  return (
    <div
      className="bg-white flex justify-center items-center py-20 text-black"
      id="UpcomingEvents"
    >
      <div className="w-[1161px]">
        <span className="flex text-5xl font-bold cursor-pointer w-full border-b-[1px] border-black/30  pb-4 mb-6">
          Upcoming Events
        </span>
        {Events.length !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {Events.map((EventResult, index) => {
              if (index < 3) {
                return <EventCard Card={EventResult} key={EventResult.id} />;
              }
            })}
          </div>
        )}
        {Events.length === 0 && (
          <div className="text-black font-bold text-4xl text-center w-full flex flex-col gap-3 mt-16">
            <span className="text-6xl">😞</span>
            <span>Sorry!! No Events Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

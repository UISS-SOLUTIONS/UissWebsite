import React from "react";
import { IEventCard } from "../../types";

interface CardProp {
  Card: IEventCard;
}

const EventCard: React.FC<CardProp> = ({ Card }) => {
  return (
    <div className=" flex-col border-b-[3px] border-[#efb631] pt-5 pb-5">
      <div className="w-full h-[200px]">
        <img
          src={Card.image}
          alt="event"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <span className="text-2xl flex font-semibold py-2">{Card.title}</span>
        <p className="opacity-60 line-clamp-3">{Card.description}</p>
        {Card.date && (
          <span className="flex pt-2 font-bold text-lg line-clamp-1">
            {Card.date}
          </span>
        )}
        {Card.venue && (
          <span className="flex pt-2 font-bold text-lg line-clamp-1">
            {Card.venue}
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCard;

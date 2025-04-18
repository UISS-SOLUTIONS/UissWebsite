import React from "react";
import { IEvents } from "@/app/AdminPanel/types";

interface CardProp {
  Card: IEvents;
}

const EventCard: React.FC<CardProp> = ({ Card }) => {
  return (
    <div className="flex flex-col items-center border-b-[3px] border-[#efb631] pt-5 pb-4">
      <div className="w-[90%] md:w-full h-[200px]">
        <img
          src={Card.imageURL === "" ? `./ctfWinner.jpg` : Card.imageURL}
          alt="event"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[90%] md:w-full flex flex-col justify-between h-full">
        <span className="text-2xl flex font-semibold py-1">{Card.title}</span>
        <p className="opacity-60 line-clamp-3">{Card.description}</p>
        <div className="flex flex-col gap-1 pt-1">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 opacity-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="flex font-bold text-base line-clamp-1 text-black/90">
              {Card.location}Mlimani City
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 opacity-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <span className="flex font-bold text-base line-clamp-1 text-black/90">
                {Card.date.slice(0, 10)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 opacity-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="flex font-bold text-base line-clamp-1 text-black/90">
                {Card.date.slice(11, 16)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import React from "react";
import EventCard from "../HomeComponents/EventCard";

type IEvents = IEventCard[];

const Events = () => {
  const Events: IEvents = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50fGVufDB8fDB8fHww",
      title: "Catch the Flag Vodacom Hackathon",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae",
      date: "Monday 11th November, 17:00 to 20:15",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/20044377/pexels-photo-20044377/free-photo-of-smiling-men-working-on-laptop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Payment Gateway Intergrations",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae",
      date: "Thursday 11th November, 10:00 to 19:15",
    },
    {
      id: 3,
      image:
        "https://www.metroind40iot.org/metroind2020/images/logo_hackathon_2020.png",
      title: "IEEE AI in Future Software Development Hackathon",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae",
      date: "Monday 11th November, 17:00 to 20:15",
    },
  ];
  return (
    <div className="bg-white flex justify-center items-center py-20 text-black">
      <div className="w-[1161px]">
        <span className=" flex text-4xl cursor-pointer font-semibold border-b-[1px] border-black/30  pb-4 mb-6">
          Upcoming Events
        </span>
        <div className="grid grid-cols-3 gap-16">
          {Events.map((EventResult, index) => {
            if (index < 3) {
              return <EventCard Card={EventResult} key={EventResult.id} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;

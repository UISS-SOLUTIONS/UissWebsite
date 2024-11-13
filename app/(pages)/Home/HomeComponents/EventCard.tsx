import React from "react";

const EventCard = () => {
  return (
    <div className=" flex-col border-b-[3px] border-[#efb631] pt-5 pb-5">
      <div className="w-full h-[200px]">
        <img
          src="https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50fGVufDB8fDB8fHww"
          alt="event"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <span className="text-2xl flex font-semibold py-2">
          Catch the Flag Vodacom Hackathon
        </span>
        <p className="opacity-60 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sit,
          beatae eum nemo cupiditate voluptate iusto molestiae repudiandae
          deleniti itaque tenetur aut dignissimos earum?
        </p>
        <span className="flex pt-2 font-bold text-lg">
          Monday 11th November, 17:00 to 20:15
        </span>
      </div>
    </div>
  );
};

export default EventCard;

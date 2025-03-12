import React from "react";
interface props {
  title: string;
  date: string;
}

const UpcomingEventsCard: React.FC<props> = ({title, date}) => {
  return (
    <div className="flex py-5 gap-3 w-full border-b-[1px] border-black/20">
      <div className="w-[25%] rounded-md overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/2012746941/photo/cyber-security-black-man-and-code-reflection-in-eyewear-hacking-and-software-update-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=QLjdGEHRLLbG5r5hlqd6XCRAflA7D5p61-kOydmcc04="
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" w-[75%] flex flex-col gap-1">
        <span className="font-bold text-lg">
          {title}
        </span>
        
        <div className="flex flex-col justify-around">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 opacity-60"
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
            <span className="text-black/60 font-semibold">Location Address</span>
          </div>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 opacity-60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-black/60 font-semibold">{date.slice(0,10)} : {date.slice(11, 16)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;

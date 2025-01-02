import { IUpdateComponent } from "@/app/(pages)/types";
import { useUpdatesStore } from "@/app/states/store";
import React from "react";

interface props {
    update: IUpdateComponent;
}

const UpdateComponent: React.FC<props> = ({update}) => {
  const setSelectedUpdate = useUpdatesStore(s => s.setSelectedUpdate)
  return (
    <div className="flex justify-between gap-2">
      <div className="w-[30%] h-[100px]">
        <img
          src={update.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-[65%] gap-y-3">
        <div className="flex gap-2 items-center opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="font-bold">{update.date}</span>
        </div>
        <span className="text-lg font-bold hover:underline cursor-pointer" onClick={() => setSelectedUpdate(update)}>
          {update.title}
        </span>
      </div>
    </div>
  );
};

export default UpdateComponent;

'use client'
import React from "react";
import UpdateComponent from "./updateComponent";
import { useUpdatesStore } from "@/app/states/store";

const RecentsUpdates = () => {
  const updates = useUpdatesStore(s => s.updates)
  return (
    <div className="w-[30%] flex flex-col gap-5">
      <div className="flex justify-between">
        <span className="font-bold text-2xl">Recent Updates</span>
        <div className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      {updates.map((update) => (
        <UpdateComponent update={update} key={update.id} />
      ))}
    </div>
  );
};

export default RecentsUpdates;

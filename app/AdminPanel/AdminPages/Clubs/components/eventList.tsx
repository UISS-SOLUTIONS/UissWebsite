import { fetchData } from "@/app/actions";
import React from "react";
import UpcomingEventsCard from "./upcomingEventsCards";

interface props {
  id: string;
}
const EventList: React.FC<props> = async ({ id }) => {
  let events: any[] = [];
  try {
    const { data } = await fetchData(`http://localhost:3000/api/events/${id}`);
    events = data;
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return (
    <>
      {events.length !== 0 ? (
        events.map((event) => {
          return (
            <UpcomingEventsCard
              key={event.id}
              title={event.title}
              date={event.date}
            />
          );
        })
      ) : (
        <div className="text-black font-bold text-2xl text-center w-full flex flex-col gap-3 my-5">
          <span className="text-5xl">😞</span>
          <span className="text-black/80">Sorry!! No Events Available</span>
        </div>
      )}
    </>
  );
};

export default EventList;

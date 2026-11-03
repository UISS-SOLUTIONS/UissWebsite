import { fetchData } from "@/app/admin/actions";
import React from "react";
import UpcomingEventsCard from "./upcomingEventsCards";
import { IEvents } from "@/app/admin/types";

interface props {
  id: string;
}

const EventList: React.FC<props> = async ({ id }) => {
  let events: IEvents[] = [];

  try {
    const { data } = await fetchData<IEvents[]>(`/events/${id}`);
    events = data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }

  return (
    <>
      {events.length !== 0 ? (
        events.map((event) => {
          return (
            <UpcomingEventsCard
              key={event.id}
              title={event.title}
              date={event.startsAt}
              location={event.location ?? "Venue to be confirmed"}
            />
          );
        })
      ) : (
        <p className="py-8 text-sm leading-6 text-muted">
          No events have been added for this club.
        </p>
      )}
    </>
  );
};

export default EventList;

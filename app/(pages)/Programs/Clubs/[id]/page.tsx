import React from "react";
import LandPage from "./LandPage";
import VisionAndMission from "@/app/(pages)/Explore/Vision&Mission";
import Governance from "@/app/(pages)/Explore/Governance";
import Events from "@/app/(pages)/Home/HomeEvents/Events";
import Quote from "@/app/(pages)/Home/Quote/Quote";
import { fetchData } from "@/app/actions";
import { IClubData } from "@/app/components/types";
import { IEventCard } from "@/app/(pages)/types";

const ClubPage = async ({ params}: { params: { id: string } }) => {
  const { id } = await params;
  const {data} = await fetchData<IClubData>(`${process.env.NEXT_PUBLIC_API_ROUTE}/clubs/${id}`)
  const {data: events} = await fetchData<IEventCard[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}`)

  return (
    <div>
      <LandPage title={data.clubName} description={data.clubDescription} />
      <VisionAndMission visionDescription={data.vision} missionDescription={data.mission} visionMissionDescription={data.visiondescription} />
      <Quote />
      <Events Events={events} />
      <Quote />
      <Governance />
    </div>
  );
};

export default ClubPage;

import React from "react";
import UpcomingEventsCard from "../components/upcomingEventsCards";
import { fetchData } from "@/app/actions";
import TableComponent from "@/app/AdminPanel/Components/table";
import VisionMissionCard from "../components/visionMissionCard";

const AdminClubDetails = async ({ params }: { params: { id: string } }) => {
  let data: {
    clubId: number;
    clubName: string;
    clubDescription: string;
    vision: string;
    mission: string;
    visiondescription: string;
    users: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    }[];
  } = {
    clubId: 0,
    clubName: "",
    clubDescription: "",
    vision: "",
    mission: "",
    visiondescription: "",
    users: [],
  };
  try {
    const response = await fetchData(
      `http://localhost:3000/api/clubs/${params.id}`
    );
    if (response.success) {
      data = response.data;
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-[15vh] bg-red-900 relative w-full">
        <div className="absolute top-[25%] left-5 z-10 flex gap-5">
          <div className="w-[150px] h-[150px] bg-orange-600  rounded-full" />
          <div className="flex flex-col">
            <span className="text-4xl pt-4 font-bold">
              {data.clubName} Club
            </span>
            <span className="text-xl">{data.users.length} students</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-[94%] gap-5 mt-14">
        <div className="w-[60%] flex flex-col justify-between">
          <div className="bg-white rounded-md shadow-md p-3 ">
            <span className="text-2xl font-bold">Description</span>
            <p className="py-2 opacity-60">{data.clubDescription}</p>
          </div>
          <div className="bg-white rounded-md shadow-md p-3 mt-5">
            <span className="text-2xl font-bold">Vision & Mission</span>
            <p className="py-2 opacity-60 line-clamp-3">
              {data.visiondescription}
            </p>
          </div>

          <div className="flex gap-5 mt-5 ">
            <VisionMissionCard title="Vision" description={data.vision} />
            <VisionMissionCard title="Mission" description={data.mission} />
          </div>
        </div>
        <div className="bg-white w-[40%] rounded-md shadow-md px-3 overflow-auto h-fit max-h-[68vh]">
          <div className="flex justify-between pt-3 sticky top-0 bg-white">
            <span className="font-bold text-2xl">Upcoming Events</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </span>
          </div>
          <UpcomingEventsCard />
          <UpcomingEventsCard />
          <UpcomingEventsCard />
        </div>
      </div>
      <div className="w-full mt-10">
        <TableComponent title="Members" values={data.users} />
      </div>
    </div>
  );
};

export default AdminClubDetails;

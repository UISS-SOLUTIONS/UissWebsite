import React from "react";
import { fetchData } from "@/app/actions";
import TableComponent from "@/app/AdminPanel/Components/table";
import VisionMissionCard from "../components/visionMissionCard";
import DescriptionCard from "../components/descriptionCard";
import AddEvent from "../components/addEvent";
import EventList from "../components/eventList";

export default async function AdminClubDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let data: {
    clubId: number;
    clubName: string;
    clubDescription: string;
    vision: string;
    mission: string;
    visiondescription: string;
  } = {
    clubId: 0,
    clubName: "",
    clubDescription: "",
    vision: "",
    mission: "",
    visiondescription: "",
  };
  let users: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];
  try {
    const response = await fetchData(`http://localhost:3000/api/clubs/${id}`);
    const userRes = await fetchData(`http://localhost:3000/api/users/clubUsers/${id}`);
    if (response.success) {
      data = response.data;
    }
    if(userRes.success) {
      users = userRes.data;
    } 
  } catch (e) {
    return (e as Error).message;
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-[18vh] bg-red-900 relative w-full">
        <img
          src="https://img.freepik.com/free-vector/online-human-team-connecting-concept-template-business-marketing_1017-53279.jpg?t=st=1741758839~exp=1741762439~hmac=283c52cd3def5da82a52e74b20279bf449b20eeb1fe897658e0e2f9aa105a127&w=1060"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="bg-black/75 w-full h-full absolute top-0" />
        <div className="absolute top-[35%] left-5 z-10 flex gap-5">
          <div className="w-[150px] h-[150px] bg-orange-600  rounded-full overflow-hidden border-[5px] border-[#E1ECE9]">
            <img
              src="https://img.freepik.com/premium-photo/engineer-working-big-cloud-computing-server_249974-14070.jpg?w=900"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-4xl pt-4 font-bold text-[#E1ECE9]">
              {data.clubName} Club
            </span>
            <span className="text-xl text-[#E1ECE9] font-semibold">{users.length} students</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-[94%] gap-5 mt-14">
        <div className="w-[60%] flex flex-col gap-5 justify-between">
          <DescriptionCard
            description={data.clubDescription}
            title="Description"
          />
          <DescriptionCard
            description={data.visiondescription}
            title="Vision & Mission"
          />

          <div className="flex gap-5 ">
            <VisionMissionCard title="Vision" description={data.vision} />
            <VisionMissionCard title="Mission" description={data.mission} />
          </div>
        </div>
        <div className="bg-white w-[40%] rounded-md shadow-md px-3 overflow-auto h-fit max-h-[68vh]">
          <div className="flex justify-between pt-3 sticky top-0 z-10 bg-white">
            <span className="font-bold text-2xl">Events</span>
            <AddEvent />
          </div>
          <EventList id={id} />
        </div>
      </div>
      <div className="w-full mt-10">
        {
          
        }
        <TableComponent title="Members" values={users} />
      </div>
    </div>
  );
}

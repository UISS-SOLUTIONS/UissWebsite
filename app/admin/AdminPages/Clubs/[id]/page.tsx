import React from "react";
import { fetchData } from "@/app/admin/actions";
import TableComponent from "@/app/admin/Components/table";
import VisionMissionCard from "../components/visionMissionCard";
import DescriptionCard from "../components/descriptionCard";
import AddEvent from "../components/addEvent";
import EventList from "../components/eventList";
import { IClubDetail } from "@/app/admin/types";
import { IClubUser } from "@/app/components/types";

export default async function AdminClubDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let data: IClubDetail = {
    clubId: 0,
    clubName: "",
    clubDescription: "",
    vision: "",
    mission: "",
    visiondescription: "",
  };

  let users: IClubUser[] = [];

  try {
    const response = await fetchData<IClubDetail>(`/clubs/${id}`);
    const userRes = await fetchData<IClubUser[]>(`/users/clubUsers/${id}`);

    if (response.success) {
      data = response.data;
    }

    if (userRes.success) {
      users = userRes.data;
    }
  } catch {
    return (
      <section className="uiss-admin-page" role="alert">
        <h1 className="uiss-section-title">Club details could not be loaded.</h1>
        <p className="mt-4 text-muted">Please try again later.</p>
      </section>
    );
  }

  return (
    <div className="uiss-admin-page space-y-8">
      <header>
        <p className="uiss-eyebrow">Club management</p>
        <h1 className="uiss-section-title mt-2">{data.clubName || "Club"}</h1>
        <p className="mt-3 text-sm text-muted">{users.length} students</p>
      </header>
      <div className="grid min-w-0 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 space-y-6">
          <DescriptionCard description={data.clubDescription} title="Description" />
          <DescriptionCard description={data.visiondescription} title="Vision & Mission" />
          <div className="grid gap-6 sm:grid-cols-2">
            <VisionMissionCard title="Vision" description={data.vision} />
            <VisionMissionCard title="Mission" description={data.mission} />
          </div>
        </div>
        <section className="uiss-admin-panel min-w-0 self-start p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Events</h2>
            <AddEvent />
          </div>
          <EventList id={id} />
        </section>
      </div>
      <TableComponent title="Members" headingLevel="h2" values={users} />
    </div>
  );
}

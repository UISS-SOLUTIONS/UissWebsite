import EditIcon from "@/app/admin/Components/editIcon";
import React from "react";
import UpdateVisionMission from "./updateVisionMission";

interface props {
  title: string;
  description: string;
}

const VisionMissionCard: React.FC<props> = ({ title, description }) => {
  return (
    <div className="uiss-admin-panel min-w-0 p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <EditIcon>
          <UpdateVisionMission title={title} />
        </EditIcon>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-muted">{description}</p>
    </div>
  );
};

export default VisionMissionCard;

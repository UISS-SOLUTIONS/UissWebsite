import EditIcon from "@/app/AdminPanel/Components/editIcon";
import React from "react";
import UpdateVisionMission from "./updateVisionMission";
interface props {
  title: string;
  description: string;
}
const VisionMissionCard: React.FC<props> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-3 w-[50%]">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">{title}</span>
        <EditIcon>
          <UpdateVisionMission title={title} />
        </EditIcon>
      </div>
      <p className="text-justify py-2 opacity-60 line-clamp-6">{description}</p>
    </div>
  );
};

export default VisionMissionCard;

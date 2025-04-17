
import EditIcon from "@/app/AdminPanel/Components/editIcon";
import React from "react";
import UpdateVisionMission from "./updateVisionMission";

interface props{
    description: string;
    title: string
}
const DescriptionCard:React.FC<props> = ({description, title}) => {
  return (
    <div className="bg-white rounded-md shadow-md p-3 ">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">{title}</span>
        <EditIcon>
          <UpdateVisionMission title={title} />
        </EditIcon>
      </div>
      <p className="py-2 opacity-60">{description}</p>
    </div>
  );
};

export default DescriptionCard;

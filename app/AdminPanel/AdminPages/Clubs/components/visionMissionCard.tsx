import React from "react";
interface props {
  title: string;
  description: string;
}
const VisionMissionCard: React.FC<props> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-3 w-[50%]">
      <span className="text-2xl font-bold">{title}</span>
      <p className="text-justify py-2 opacity-60 line-clamp-6">{description}</p>
    </div>
  );
};

export default VisionMissionCard;

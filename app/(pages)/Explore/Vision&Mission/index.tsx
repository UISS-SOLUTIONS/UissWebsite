import React from "react";
import Card from "./card";
import { IVisionCard } from "../../types";

const VisionAndMission = ({
  visionMissionDescription,
  visionDescription,
  missionDescription,
}: {
  visionMissionDescription: string;
  visionDescription: string;
  missionDescription: string;
}) => {
  const cards: IVisionCard[] = [
    {
      id: 1223,
      title: "Vision",
      description: visionDescription,
      icon: "https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/100/external-Binoculars-technology-and-devices-smashingstocks-glyph-smashing-stocks.png",
    },
    {
      id: 1224,
      title: "Mission",
      description: missionDescription,
      icon: "https://img.icons8.com/ios/100/goal--v1.png",
    },
  ];
  return (
    <section
      className="flex flex-col justify-center items-center"
      id="ExploreVisionMission"
    >
      <div className="bg-ternary w-full flex justify-center py-20">
        <div className="w-[1161px] flex flex-col items-center text-center">
          <span className="text-5xl font-bold">Vision & Mission</span>
          <p className="text-lg py-6">
            {visionMissionDescription}
          </p>
        </div>
      </div>
      <div className="flex justify-around w-[1161px] pb-20">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </div>
    </section>
  );
};

export default VisionAndMission;

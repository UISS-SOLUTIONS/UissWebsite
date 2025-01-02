import React from "react";
import Card from "./card";
import { IVisionCard } from "../../types";

const VisionAndMission = () => {
  const cards: IVisionCard[] = [
    {
      id: 1223,
      title: "Vision",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique a aspernatur perspiciatis, aut ipsum itaque dolorum sed! Quo facilis quia cumque praesentium optio qui commodi. Aperiam doloribus, eos ad voluptatem voluptates in aliquam, sapiente voluptatibus repellat quidem consequatur ratione consectetur. Tempora assumenda corporis mollitia pariatur.",
      icon: "https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/100/external-Binoculars-technology-and-devices-smashingstocks-glyph-smashing-stocks.png",
    },
    {
      id: 1224,
      title: "Mission",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique a aspernatur perspiciatis, aut ipsum itaque dolorum sed! Quo facilis quia cumque praesentium optio qui commodi. Aperiam doloribus, eos ad voluptatem voluptates in aliquam, sapiente voluptatibus repellat quidem consequatur ratione consectetur. Tempora assumenda corporis mollitia pariatur.",
      icon: "https://img.icons8.com/ios/100/goal--v1.png",
    },
  ];
  return (
    <section className="flex flex-col justify-center items-center" id="ExploreVisionMission">
      <div className="bg-ternary w-full flex justify-center py-20">
        <div className="w-[1161px] flex flex-col items-center text-center">
          <span className="text-5xl font-bold">Vision & Mission</span>
          <p className="text-lg py-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            consectetur doloremque placeat error itaque praesentium fugit
            accusantium labore aspernatur! Nobis quasi minima dolore in vitae
            numquam nihil, eius suscipit sapiente dolor. Ex nam possimus,
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

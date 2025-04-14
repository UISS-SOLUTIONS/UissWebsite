import React from "react";
import { IVisionCard } from "../../types";

interface props {
  card: IVisionCard;
}

const Card: React.FC<props> = ({ card }) => {
  return (
    <div className="w-[40%] flex flex-col items-center relative">
      <div className="w-[150px] h-[150px] border-8 border-secondary rounded-full p-3 bg-ternary absolute top-[-23%]">
        <img
          src={`${card.icon}`}
          alt="external-binoculars-camping-dreamstale-lineal-dreamstale-1"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-4xl font-bold pt-[107px]">{card.title}</span>
      <p className="text-justify py-5">{card.description}</p>
    </div>
  );
};

export default Card;

import React from "react";
import { IAwardCard } from "../../types";

interface props {
    itemNo: number
    award: IAwardCard;
}
const AwardCard : React.FC<props> = ({itemNo,award}) => {
  return (
    <div className="flex gap-4 py-10 border-b-2 border-black/10">
      <div className={`flex flex-col w-[80%] gap-4 ${itemNo%2 != 0 ? 'order-last': '-order-last'}`}>
        <span className="text-3xl font-semibold">
            {award.title}
        </span>
        <p className="text-lg">
            {award.description}
        </p>
        <span className="text-lg font-semibold">
            {award.date}
          
        </span>
      </div>
      <div className="w-[30%]">
        <img
          src={`${award.image}`}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AwardCard;

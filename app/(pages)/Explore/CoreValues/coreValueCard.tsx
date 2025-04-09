import React from "react";
import { ICoreValue } from "../../types";

interface props {
  ValueCard: ICoreValue;
}

const CoreValueCard: React.FC<props> = ({ ValueCard }) => {
  return (
    <div className="w-[35%] text-lg p-10 cursor-pointer">
      <span className="uppercase text-xl font-semibold">{ValueCard.value}</span>
      <p className="text-justify py-3 opacity-70">{ValueCard.description}</p>
    </div>
  );
};

export default CoreValueCard;

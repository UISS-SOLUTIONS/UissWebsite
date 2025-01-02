import React from "react";
import { IBenefitCard } from "../../types";

interface props {
    benefit: IBenefitCard
    benefitNo:number;
}

const BenefitCard: React.FC<props> = ({benefit, benefitNo}) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex justify-center items-center bg-ternary w-[100px] h-[100px] rounded-full">
        <span className="text-5xl font-bold">{benefitNo}</span>
      </div>
      <span className="capitalize text-[26px] font-bold w-[80%]">
        {benefit.title}
      </span>
    </div>
  );
};

export default BenefitCard;

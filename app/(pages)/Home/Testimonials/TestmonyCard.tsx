import React from "react";
import {ITestmonyCard} from '../types';

interface props {
  className?: string;
  slideNo: number;
  testmonyCard: ITestmonyCard;
}

const TestmonyCard: React.FC<props> = ({
  className,
  slideNo,
  testmonyCard,
}) => {
  return (
    <div
      className={` flex flex-col items-center text-black  keen-slider__slide number-slide${slideNo.toString()} ${className}`}
    >
      <p className="w-[85%] text-justify pt-8 pb-4 text-base">
        {testmonyCard.description}
      </p>
      <div className="h-[80px] w-[80px] rounded-[50%] overflow-hidden">
        <img
          src={testmonyCard.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-y-[2px] mt-4 mb-6">
        <span className="font-semibold ">{testmonyCard.position}</span>
        <span className="font-semibold">{testmonyCard.name}</span>
      </div>
    </div>
  );
};

export default TestmonyCard;

import React from "react";
import CoreValueCard from "./coreValueCard";
import { ICoreValue } from "../../types";

const CoreValues = () => {
  const coreValues: ICoreValue[] = [
    {
      id: 30,
      title: "Creativity",
      description:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure atque,delectus ab fugit maiores laboriosam recusandae temporibus provident dolorum totam, facere eum! Eum alias quod distinctio aliquam modi quibusdam id.",
    },
    {
      id: 31,
      title: "Innovation",
      description:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure atque,delectus ab fugit maiores laboriosam recusandae temporibus provident dolorum totam, facere eum! Eum alias quod distinctio aliquam modi quibusdam id.",
    },
    {
      id: 32,
      title: "Humanity",
      description:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure atque,delectus ab fugit maiores laboriosam recusandae temporibus provident dolorum totam, facere eum! Eum alias quod distinctio aliquam modi quibusdam id.",
    },
  ];
  return (
    <section className="flex justify-center items-center bg-primary pt-[10vh] pb-20 text-white" id="ExploreCoreValues">
      <div className="w-[1161px]">
        <span className="text-5xl font-bold border-b-2 pb-2 border-white/15">
          Our Core Values
        </span>
        <div className="flex justify-between pt-10">
          {coreValues.map((coreValue) => (
            <CoreValueCard ValueCard={coreValue} key={coreValue.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;

import React from "react";
import AwardCard from "./AwardCard";
import { IAwardCard } from "../../types";
import { Selector } from "@/app/components/Selector";
import { SelectProps } from "@/app/components/types";

const AwardAndArchivement = () => {
  const awards: IAwardCard[] = [
    {
      id: 55,
      title: "Catch The Flag 2nd Runner up Winner",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit. Necessitatibus, quam. Placeat iusto quisquam deleniti veritatiseveniet perspiciatis quis, odit nisi molestias, ratione quam laborum tempora? Magnam aut aliquam ducimus, minima accusantium debitis tempora iusto architecto unde pariatur impedit eaque eum inventore neque doloremque!",
      date: "Friday, 15th November 2024",
      image: "./ctfWinner.jpg",
    },
    {
      id: 56,
      title: "Catch The Flag 2nd Runner up Winner",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit. Necessitatibus, quam. Placeat iusto quisquam deleniti veritatiseveniet perspiciatis quis, odit nisi molestias, ratione quam laborum tempora? Magnam aut aliquam ducimus, minima accusantium debitis tempora iusto architecto unde pariatur impedit eaque eum inventore neque doloremque!",
      date: "Friday, 15th November 2024",
      image: "./ctfWinner.jpg",
    },
    {
      id: 57,
      title: "Catch The Flag 2nd Runner up Winner",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit. Necessitatibus, quam. Placeat iusto quisquam deleniti veritatiseveniet perspiciatis quis, odit nisi molestias, ratione quam laborum tempora? Magnam aut aliquam ducimus, minima accusantium debitis tempora iusto architecto unde pariatur impedit eaque eum inventore neque doloremque!",
      date: "Friday, 15th November 2024",
      image: "./ctfWinner.jpg",
    },
    {
      id: 58,
      title: "Catch The Flag 2nd Runner up Winner",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit. Necessitatibus, quam. Placeat iusto quisquam deleniti veritatiseveniet perspiciatis quis, odit nisi molestias, ratione quam laborum tempora? Magnam aut aliquam ducimus, minima accusantium debitis tempora iusto architecto unde pariatur impedit eaque eum inventore neque doloremque!",
      date: "Friday, 15th November 2024",
      image: "./ctfWinner.jpg",
    },
  ];

  const selectOptions: SelectProps[] = [
    {
      id: 20,
      placeholder: "Year",
      options: [
        { name: "2020" },
        { name: "2021" },
        { name: "2022" },
        { name: "2023" },
        { name: "2024" },
      ],
    },
  ];
  return (
    <section className="flex justify-center">
      <div className="w-[1161px] py-10">
        <div className="flex justify-between">
          <span className="text-5xl font-bold border-b-2 pb-2 border-primary/20">
            Awards & Archivements
          </span>
          {
            selectOptions.map((selectOption) => <Selector select={selectOption} key={selectOption.id}/>)
          }
        </div>
        <div className="py-10 flex flex-col gap-10">
          {awards.map((award, index) => (
            <AwardCard award={award} itemNo={index + 1} key={award.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardAndArchivement;

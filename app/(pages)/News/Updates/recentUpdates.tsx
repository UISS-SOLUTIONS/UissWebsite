import React from "react";
import AwardCard from "../../Explore/Award&Archivements/AwardCard";
import { IAwardCard } from "../../types";

const RecentUpdates = () => {
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
  return (
    <section className="flex justify-center pt-[10vh]">
      <div className="w-[1200px]">
        <span className="text-5xl pb-3 border-b-2 border-black/20 font-bold">
          Recent Updates
        </span>
        <div className="py-10 flex flex-col gap-10">
          {awards.map((award, index) => (
            <AwardCard award={award} itemNo={index + 1} key={award.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentUpdates;

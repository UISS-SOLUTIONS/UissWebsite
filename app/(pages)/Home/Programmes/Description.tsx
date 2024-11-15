"use client";
import React, { useState } from "react";

const Description = () => {
  const [About, setAbout] = useState<boolean>(true);
  const [Mission, setMission] = useState<boolean>();
  const [Vision, setVision] = useState<boolean>();

  return (
    <div>
      <div>
        <ul className="flex gap-10 pb-4 pt-8 text-2xl font-bold">
          <li
            className={`cursor-pointer ${About && 'border-b-[3px] border-[#efb631]'}`}
            onClick={() => {
              setMission(false);
              setVision(false);
              setAbout(true);
            }}
          >
            About
          </li>
          <li
          className={`cursor-pointer ${Mission && 'border-b-[3px] border-[#efb631]'}`}
            onClick={() => {
              setAbout(false);
              setVision(false);
              setMission(true);
            }}
          >
            Mission
          </li>
          <li
          className={`cursor-pointer ${Vision && 'border-b-[3px] border-[#efb631]'}`}
            onClick={() => {
              setMission(false);
              setAbout(false);
              setVision(true);
            }}
          >
            Vision
          </li>
        </ul>
        {About && (
          <p className="text-lg text-justify w-[95%] opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            corporis mollitia blanditiis delectus nisi molestias sed quisquam?
            Deserunt debitis, rerum est minus quam ut. Doloremque repellat,
            deleniti repudiandae voluptatum id tempore eum et. Neque explicabo
            optio voluptate quae, tempore at autem laborum nisi. Veniam, natus?
            Ipsa error quo quidem, totam dolore temporibus exercitationem quia!
            Quae unde a ipsa libero et animi odit sapiente enim consequatur
            molestias! Distinctio, ullam veritatis? Impedit.
          </p>
        )}
        {Mission && (
          <p className="text-lg text-justify w-[95%] opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos
            commodi non quibusdam consectetur. Quis earum at, atque eos commodi
            adipisci placeat quaerat unde quasi id fugit amet, et sunt
            laudantium maxime illum beatae. Aperiam!
          </p>
        )}
        {Vision && (
          <p className="text-lg text-justify w-[95%] opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis
            explicabo, minus sequi debitis maxime dolor necessitatibus dolorum?
            Reiciendis quo nemo necessitatibus maiores quia alias iste vero,
            eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque
            blanditiis delectus at et sapiente architecto non, similique
            eligendi animi sed, reiciendis velit fugiat?
          </p>
        )}
      </div>
    </div>
  );
};

export default Description;

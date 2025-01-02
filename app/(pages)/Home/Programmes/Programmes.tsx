import React from "react";
import Description from "./Description";
import AutoSlider from "@/app/components/AutoSlider";
import { IProgramme } from "../../types";

type Programmes = IProgramme[];

const Programmes = () => {
  const Programmes: Programmes = [
    {
      id: 11,
      video: "https://www.youtube.com/embed/U6fC4Ij608A",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 12,
      video: "https://www.youtube.com/embed/mZ5hnNRBFsc?si=M1vKFqCcvMe1agBd",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 13,
      video: "https://www.youtube.com/embed/na80LQCX1KU?si=sS-4qjH-Pfq43vEl",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 14,
      video: "https://www.youtube.com/embed/3-iCDOYkfms?si=ypN7ub542p_K_ovN",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 15,
      video: "https://www.youtube.com/embed/PUnu_i5Jmtw?si=Pluy3Iw1gAgcpVCV",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 16,
      video: "https://www.youtube.com/embed/LjZxeSne67E?si=8yfzWj7Zk6B6lZIC",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 17,
      video: "https://www.youtube.com/embed/MM3SNTsmZe4?si=EZtlBc0Qy4wdU14d",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
    {
      id: 18,
      video: "https://www.youtube.com/embed/P54QwJt4dC8?si=2HzsW73g50IFAswU",
      description: {
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis mollitia blanditiis delectus nisi molestias sed quisquam? Deserunt debitis, rerum est minus quam ut. Doloremque repellat, deleniti repudiandae voluptatum id tempore eum et. Neque explicabo optio voluptate quae, tempore at autem laborum nisi. Veniam, natus? Ipsa error quo quidem, totam dolore temporibus exercitationem quia! Quae unde a ipsa libero et animi odit sapiente enim consequatur molestias! Distinctio, ullam veritatis? Impedit.",
        mission:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos commodi non quibusdam consectetur. Quis earum at, atque eos commodi adipisci placeat quaerat unde quasi id fugit amet, et sunt laudantium maxime illum beatae. Aperiam!",
        vision:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis explicabo, minus sequi debitis maxime dolor necessitatibus dolorum? Reiciendis quo nemo necessitatibus maiores quia alias iste vero,eum, minus rerum eveniet vitae unde, deleniti inventore. Doloremque blanditiis delectus at et sapiente architecto non, similique eligendi animi sed, reiciendis velit fugiat?",
      },
    },
  ];
  return (
    <div className="bg-white flex justify-center items-center py-20 text-black" id="HomeProgrammes">
      <div className="w-[1161px]">
        <span className=" flex text-4xl cursor-pointer font-semibold border-b-[1px] border-black/30  pb-4 mb-4 text-black">
          Explore our programmes
        </span>
        <div className="bg-black w-full rounded-2xl mt-10 overflow-hidden">
          <AutoSlider>
            {Programmes.map((Programme, index) => {
              return (
                <div
                  className={`flex flex-col md:flex-row gap-5 px-3 text-white h-[50vh] keen-slider__slide number-slide${
                    index + 1
                  }`}
                  key={Programme.id}
                >
                  <div className="w-[55%] aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={Programme.video}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="object-cover"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div>
                    <Description description={Programme.description} />
                  </div>
                </div>
              );
            })}
          </AutoSlider>
        </div>
      </div>
    </div>
  );
};

export default Programmes;

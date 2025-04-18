import React from "react";
import Description from "./Description";
import AutoSlider from "@/app/components/AutoSlider";
import { IClub, IErrorFormat } from "../../types";
import { fetchData } from "@/app/actions";
import NoResults from "@/app/components/noResults";

const Programmes = async () => {
  const { data: clubs } = await fetchData<IClub[] | IErrorFormat>(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/clubs`
  );
  return (
    <div
      className="bg-white flex justify-center items-center py-20 text-black"
      id="HomeProgrammes"
    >
      <div className="md:w-[1161px] w-full">
        <span className="flex justify-center text-center md:justify-start md:text-left text-4xl cursor-pointer font-semibold border-b-[1px] border-black/30  pb-4 mb-4 text-black">
          Explore our programmes
        </span>
        {Array.isArray(clubs) ? (
          <div className="bg-black md:rounded-2xl mt-10 overflow-hidden">
            <AutoSlider>
              {clubs.map((Programme, index) => {
                return (
                  <div
                    className={` flex flex-col md:flex-row gap-5 px-3 text-white md:h-[50vh] keen-slider__slide number-slide${
                      index + 1
                    }`}
                    key={Programme.id}
                  >
                    <div className="w-full h-[30vh] md:h-full md:w-[55%] aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          Programme.introVidId === ""
                            ? `https://www.youtube.com/embed/kVQSdLgd1rM?si=-zvR9ammHmx7Iqk7`
                            : `https://www.youtube.com/embed/${Programme.introVidId}`
                        }
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="object-cover"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div>
                      <Description
                        description={Programme.description}
                        mission={Programme.mission}
                        vision={Programme.vision}
                        title={Programme.title}
                      />
                    </div>
                  </div>
                );
              })}
            </AutoSlider>
          </div>
        ) : (
          <NoResults message={clubs.message}/>
        )}
      </div>
    </div>
  );
};

export default Programmes;

import React from "react";
import CoreValueCard from "./coreValueCard";
import { ICoreValue, IErrorFormat } from "../../types";
import { fetchData } from "@/app/actions";
import NoResults from "@/app/components/noResults";

const CoreValues = async () => {
  const { data } = await fetchData<ICoreValue[] | IErrorFormat>(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/coreValues`
  );
  return (
    <section
      className="flex justify-center items-center bg-primary pt-[10vh] pb-20 text-white"
      id="ExploreCoreValues"
    >
      <div className="w-[1161px]">
        <span className="text-5xl font-bold border-b-2 pb-2 border-white/15">
          Our Core Values
        </span>
        {Array.isArray(data) ? (
          <div className="flex justify-between pt-10">
            {data.map((coreValue) => (
              <CoreValueCard ValueCard={coreValue} key={coreValue.id} />
            ))}
          </div>
        ) : (
          <NoResults message={data.message} />
        )}
      </div>
    </section>
  );
};

export default CoreValues;

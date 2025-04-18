import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { ICoreValue, IErrorFormat } from "@/app/(pages)/types";
import NoResults from "@/app/components/noResults";

const CoreValues = async () => {
  const { data } = await fetchData<ICoreValue[] | IErrorFormat>(
    "http://localhost:3000/api/coreValues"
  );

  return (
    <div className="my-[3vh]">
      {Array.isArray(data) ? (
        <TableComponent title="Core Values" values={data} action />
      ) : (
        <NoResults message={data.message} />
      )}
    </div>
  );
};

export default CoreValues;

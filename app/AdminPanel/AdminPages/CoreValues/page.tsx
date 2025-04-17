import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { ICoreValue } from "@/app/(pages)/types";

const CoreValues = async () => {
  let data : ICoreValue[] = [];
  try {
    const response = await fetchData<ICoreValue[]>("http://localhost:3000/api/coreValues");
    if (response.success) {
      data = response.data;
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }

  return (
    <div className="my-[3vh]">
      <TableComponent title="Core Values" values={data} action />
    </div>
  );
};

export default CoreValues;

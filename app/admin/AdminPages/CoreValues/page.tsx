export const dynamic = "force-dynamic";

import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { ICoreValue, IErrorFormat } from "@/app/(pages)/types";

const CoreValues = async () => {
  const { data } = await fetchData<ICoreValue[] | IErrorFormat>(
   `${process.env.NEXT_PUBLIC_API_ROUTE}/coreValues`
  );

  return (
    <div className="my-[3vh]">
      {Array.isArray(data) ? (
        <TableComponent title="Core Values" values={data} action />
      ) : (
        <TableComponent title="Core Values" values={[]} action />
      )}
    </div>
  );
};

export default CoreValues;

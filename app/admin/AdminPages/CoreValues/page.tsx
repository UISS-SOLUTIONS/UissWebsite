export const dynamic = "force-dynamic";

import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/admin/actions";
import { ICoreValues, IErrorFormat } from "@/app/admin/types";

const CoreValues = async () => {
  const { data } = await fetchData<ICoreValues[] | IErrorFormat>("/coreValues");

  return (
    <div className="uiss-admin-page">
      {Array.isArray(data) ? (
        <TableComponent title="Core Values" values={data} action />
      ) : (
        <TableComponent title="Core Values" values={[]} action />
      )}
    </div>
  );
};

export default CoreValues;

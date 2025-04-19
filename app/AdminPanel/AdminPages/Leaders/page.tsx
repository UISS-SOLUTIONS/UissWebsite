import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { IErrorFormat, ILeader } from "@/app/(pages)/types";

const LeadersPage = async () => {
  const { data } = await fetchData<ILeader[] | IErrorFormat>(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/leaders`
  );
  return (
    <div className="my-[3vh]">
      {Array.isArray(data) ? (
        <TableComponent title="Leaders" values={data} />
      ) : (
        <TableComponent title="Leaders" values={[]} />
      )}
    </div>
  );
};

export default LeadersPage;

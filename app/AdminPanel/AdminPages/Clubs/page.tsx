import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { IClubsData } from "@/app/components/types";

const Clubs = async () => {
  let data:IClubsData[] = [];
  try {
    const response = await fetchData<IClubsData[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}/clubs`);
    if (response.success) {
      data = response.data;
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return (
    <div className="my-[3vh]">
      <TableComponent title="Clubs" values={data} view />;
    </div>
  );
};

export default Clubs;

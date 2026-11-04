export const dynamic = "force-dynamic";

import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/admin/actions";
import { IClubsData } from "@/app/components/types";

const Clubs = async () => {
  let data: IClubsData[] = [];

  try {
    const response = await fetchData<IClubsData[]>("/clubs");

    if (response.success) {
      data = response.data;
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }

  return (
    <div className="uiss-admin-page">
      <TableComponent title="Clubs" values={data} view />
    </div>
  );
};

export default Clubs;

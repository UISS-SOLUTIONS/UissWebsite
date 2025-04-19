export const dynamic = "force-dynamic";

import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { IUser } from "@/app/components/types";
import { IErrorFormat } from "@/app/(pages)/types";

const UserList = async () => {
  const { data } = await fetchData<IUser[] | IErrorFormat>(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/users`
  );
  return (
    <div className="my-[3vh]">
      {Array.isArray(data) ? (
        <TableComponent title="Users" values={data} />
      ) : (
        <TableComponent title="Users" values={[]} />
      )}
    </div>
  );
};

export default UserList;

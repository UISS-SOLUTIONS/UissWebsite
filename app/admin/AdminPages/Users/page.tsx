export const dynamic = "force-dynamic";

import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/admin/actions";
import { IUser } from "@/app/components/types";
import { IErrorFormat } from "@/app/admin/types";

const UserList = async () => {
  const { data } = await fetchData<IUser[] | IErrorFormat>("/users");

  return (
    <div className="uiss-admin-page">
      {Array.isArray(data) ? (
        <TableComponent title="Users" values={data} />
      ) : (
        <TableComponent title="Users" values={[]} />
      )}
    </div>
  );
};

export default UserList;

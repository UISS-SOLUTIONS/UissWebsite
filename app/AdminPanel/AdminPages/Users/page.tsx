import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";
import { IUser } from "@/app/components/types";

const UserList = async () => {
  let data: IUser[] = [];
  try {
    const response = await fetchData<IUser[]>(
      "http://localhost:3000/api/users"
    );
    if (response.success) {
      data = response.data;
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return (
    <div className="my-[3vh]">
      <TableComponent title="Users" values={data} />;
    </div>
  );
};

export default UserList;

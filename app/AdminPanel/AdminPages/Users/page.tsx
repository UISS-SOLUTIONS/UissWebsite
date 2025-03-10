import React from "react";
import TableComponent from "../../Components/table";
import { fetchData } from "@/app/actions";

const UserList = async () => {
  let data = []
  try{
    const response = await fetchData("http://localhost:3000/api/users");
    if(response.success){
      data = response.data;
    }
  }catch(e){
    throw new Error((e as Error).message);
  }
  return <TableComponent title="Users" values={data}/>;
};

export default UserList;

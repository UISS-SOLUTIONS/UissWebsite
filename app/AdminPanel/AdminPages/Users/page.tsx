import React from "react";
import TableComponent from "../../Components/table";

const UserList = () => {
  return <TableComponent title="Users" endpoint="http://localhost:3000/api/users"/>;
};

export default UserList;

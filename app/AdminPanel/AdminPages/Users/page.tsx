'use client'
import { fetchData } from "@/app/actions";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
    const loadusers = async()=> {
      try {
        const response = await fetchData("http://localhost:3000/api/users");
        if (response.success) {
          setUsers(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    loadusers()
  },[])

  const tableHeaders = users.length > 0 ? Object.keys(users[0]) : [];

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAFAFA] rounded-xl shadow-lg mx-10">
      <span className="flex w-full text-3xl border-b-black/30 border-[1px] uppercase font-bold px-7 py-3">
        Users
      </span>
      <div className="flex justify-end w-[97.5%]">
        <div className="flex items-center gap-3 my-[2vh]">
          <label htmlFor="section" className="text-xl font-bold">
            Search:
          </label>
          <input
            type="text"
            name="section"
            id=""
            className="py-1 px-3 text-base focus:outline-none bg-transparent border-black/20 border-[1px] rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
          />
          <div className="py-2 px-4 text-2xl bg-ternary/90 cursor-pointer font-extrabold rounded-md">
            +
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center pb-5">
        <table className="table-auto w-[95%]">
          <thead className="font-bold text-lg">
            <tr>
             {tableHeaders.map((header) => (
                <td key={header} className="py-3">
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              (users && filteredUsers.length <= 0) ? users.map((user, index)=> (
                <tr key={index} className="text-lg odd:bg-slate-100 border-y-[1px] border-black/10 text-black/80">
                  <td className="p-3">{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.registeredAt.slice(0,10)}</td>
                </tr>
              )): filteredUsers.map((user, index)=> (
                <tr key={index} className="text-lg odd:bg-slate-100 border-y-[1px] border-black/10 text-black/80">
                  <td className="p-3">{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.registeredAt.slice(0,10)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="flex justify-between items-center w-[95%] py-5">
          <span className="col-span-3 font-bold text-lg">
            Showing 1 to 10 of 57 entries
          </span>
          <div className="flex gap-2">
            <span className="flex justify-center items-center py-2 px-4 rounded-lg bg-slate-300 font-bold w-fit cursor-pointer">
              1
            </span>
            <span className="flex justify-center items-center py-2 px-4 rounded-lg bg-slate-300/40 font-bold w-fit cursor-pointer">
              2
            </span>
            <span className="flex justify-center items-center py-2 px-4 rounded-lg bg-slate-300/40 font-bold w-fit cursor-pointer">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

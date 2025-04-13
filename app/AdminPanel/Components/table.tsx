"use client";
import React, { useState } from "react";
import EditIcon from "./editIcon";
import AddIcon from "./addIcon";
import CoreValueForm from "./coreValueForm";
import AddUserForm from "./addUserForm";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AddClub from "../AdminPages/Clubs/components/addClub";
import AddLeaderForm from "./addLeaderForm";

interface props {
  title: string;
  endpoint?: string;
  action?: boolean;
  view?: boolean;
  values: any[];
}

const TableComponent: React.FC<props> = ({
  title,
  action = false,
  view = false,
  values = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const tableHeaders = values.length > 0 ? Object.keys(values[0]) : [];

  const filteredData = values.filter((item) =>
    tableHeaders.some((key) =>
      String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="bg-[#FAFAFA] rounded-xl shadow-lg mx-10">
      <span className="flex w-full text-3xl border-b-black/30 border-[1px] uppercase font-bold px-7 py-3">
        {title}
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
          <AddIcon className="p-3 bg-ternary/90 cursor-pointer rounded-md">
            {pathname === "/AdminPanel/AdminPages/Users" && <AddUserForm />}
            {pathname === "/AdminPanel/AdminPages/CoreValues" && (
              <CoreValueForm add />
            )}
            {pathname === "/AdminPanel/AdminPages/Clubs" && (<AddClub/>)}
            {pathname === "/AdminPanel/AdminPages/Leaders" && (<AddLeaderForm/>)}
          </AddIcon>
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
              {(action || view) && <td className="py-3">Action</td>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr
                  key={index}
                  className="text-lg odd:bg-slate-100 border-y-[1px] border-black/10 text-black/80 "
                >
                  {tableHeaders.map((header) => (
                    <td key={header} className="py-3">
                      <p className="line-clamp-1 pr-5">{data[header]}</p>
                    </td>
                  ))}
                  {action && (
                    <td className="py-3">
                      <EditIcon>
                        {pathname === "/AdminPanel/AdminPages/CoreValues" && (
                          <CoreValueForm data={data} />
                        )}
                      </EditIcon>
                    </td>
                  )}
                  {view && (
                    <td className="py-3">
                      <span className="font-bold text-lg border-ternary border-[1px] rounded-md px-3 py-1 bg-ternary cursor-pointer">
                        <Link href={`/AdminPanel/AdminPages/Clubs/${data.id}`}>
                          View
                        </Link>
                      </span>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center">
                  No data found
                </td>
              </tr>
            )}
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

export default TableComponent;

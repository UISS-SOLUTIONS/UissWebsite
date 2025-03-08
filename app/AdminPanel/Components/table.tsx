"use client";
import { fetchData } from "@/app/actions";
import React, { useEffect, useState } from "react";
import EditIcon from "./editIcon";
import AddIcon from "./addIcon";
import CoreValueForm from "./coreValueForm";
import AddUserForm from "./addUserForm";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface props {
  title: string;
  endpoint: string;
  action?: boolean;
  view?: boolean;
}

const TableComponent: React.FC<props> = ({
  title,
  endpoint,
  action = false,
  view = false,
}) => {
  const [data, setdata] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchData(endpoint);
        if (response.success) {
          setdata(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }, [endpoint]);

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  const filteredData = data.filter((item) =>
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
          <AddIcon>
            {pathname === "/AdminPanel/AdminPages/Users" && <AddUserForm />}
            {pathname === "/AdminPanel/AdminPages/CoreValues" && (
              <CoreValueForm add />
            )}
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
                          <CoreValueForm />
                        )}
                      </EditIcon>
                    </td>
                  )}
                  {view && (
                    <Link href={`/AdminPanel/AdminPages/Clubs/${data.id}`}>
                      <td className="py-3">
                        <span className="font-bold text-lg border-ternary border-[1px] rounded-md px-3 py-1 bg-ternary cursor-pointer">
                          View
                        </span>
                      </td>
                    </Link>
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

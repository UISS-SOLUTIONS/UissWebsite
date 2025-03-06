"use client";
import { fetchData } from "@/app/actions";
import CallToAction from "@/app/components/CallToAction";
import React, { useEffect, useState } from "react";
import EditIcon from "./editIcon";
import FormWrapper from "@/app/components/formWrapper";

interface props {
  title: string;
  endpoint: string;
  action?: boolean;
}

const TableComponent: React.FC<props> = ({
  title,
  endpoint,
  action = false,
}) => {
  const [data, setdata] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          <div className="p-3 text-2xl bg-ternary/90 cursor-pointer font-extrabold rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="size-4"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
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
              {action && <td className="py-3">Action</td>}
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
                        <FormWrapper onSubmit={(e) => console.log(e.values)}>
                          <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
                            Core Value
                          </span>
                          <div className="flex flex-col gap-2 py-5">
                            <label
                              htmlFor="value"
                              className="text-xl font-bold"
                            >
                              Value:
                            </label>
                            <input
                              type="text"
                              name="value"
                              id=""
                              className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
                              value={"Creativity"}
                            />
                            <label
                              htmlFor="description"
                              className="text-xl font-bold"
                            >
                              Description:
                            </label>
                            <textarea
                              name="description"
                              id=""
                              className="p-2 resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
                              rows={6}
                            />
                          </div>
                        </FormWrapper>
                      </EditIcon>
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

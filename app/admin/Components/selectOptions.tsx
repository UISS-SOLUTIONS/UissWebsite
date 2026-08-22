'use client'
import { fetchData } from "@/app/actions";
import React, { useEffect, useState } from "react";
import { IPosition } from "../types";

function SelectOptions() {
    const [positions, setpositions] = useState<IPosition[]>([])
  useEffect(() => {
    const fetchPositions = async () => {
      const { data } = await fetchData<IPosition[]>(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/positions`
      );
       setpositions(data)
    };

    fetchPositions()
  },[]);
  return (
    <>
      <label htmlFor="positionId" className="text-xl font-bold pt-1">
        Postion:
      </label>
      <select
        name="positionId"
        className="p-2 text-base resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
      >
        {positions.map((position) => (
          <option value={position.id} key={position.id}>
            {position.title}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectOptions;

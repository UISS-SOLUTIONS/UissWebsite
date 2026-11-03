"use client";

import { fetchData } from "@/app/admin/actions";
import React, { useEffect, useState } from "react";
import { IPosition } from "../types";

function SelectOptions() {
  const formId = React.useId();
  const [positions, setpositions] = useState<IPosition[]>([]);
  useEffect(() => {
    const fetchPositions = async () => {
      const { data } = await fetchData<IPosition[]>("/positions");

      setpositions(data);
    };

    fetchPositions();
  }, []);

  return (
    <>
      <div className="grid min-w-0 gap-2">
        <label htmlFor={`${formId}-positionId`} className="text-sm font-medium">
          Position:
        </label>
        <select name="positionId" id={`${formId}-positionId`} className="uiss-field">
          {positions.map((position) => (
            <option value={position.id} key={position.id}>
              {position.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectOptions;

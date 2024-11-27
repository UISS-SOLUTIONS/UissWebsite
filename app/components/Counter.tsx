'use client'
import React, { useEffect, useState } from "react";
import { StatCounterProps } from "./types";

interface props {
  stat: StatCounterProps;
}

const StatCounter: React.FC<props> = ({stat}) => {
    const { start, end, duration, label } = stat;
  const [value, setValue] = useState(start);

  useEffect(() => {
    let current = start;
    const increment = (end - start) / ((duration*1000) / 20); // 20ms intervals
    const interval = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(interval);
      }
      setValue(Math.round(current));
    }, 20);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [start, end, duration]);

  return (
    <div className="flex flex-col justify-center items-center text-secondary w-fit text-4xl font-bold cursor-pointer">
      <span className="text-6xl text-ternary">{value}</span>
      <span>{label}</span>
    </div>
  );
};

export default StatCounter;


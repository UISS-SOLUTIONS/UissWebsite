"use client";
import React, { useState, useEffect } from "react";
import MemberCard from "./memberCard";
import { IErrorFormat, ILeader } from "../../types";
import { Selector } from "@/app/components/Selector";
import { fetchData } from "@/app/actions";
import NoResults from "@/app/components/noResults";

const Governance = () => {
  const [leaders, setLeaders] = useState<ILeader[] | IErrorFormat>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const defaultPositions = [
    "Chairperson",
    "Vice Chairperson",
    "General Secretary",
  ];
  const [filteredLeaders, setfilteredLeaders] = useState<ILeader[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data: fetchedLeaders } = await fetchData<
        ILeader[] | IErrorFormat
      >(`${process.env.NEXT_PUBLIC_API_ROUTE}/leaders`);
      setLeaders(fetchedLeaders);

      if (Array.isArray(fetchedLeaders)) {
        setfilteredLeaders(
          fetchedLeaders.filter(
            (leader) =>
              defaultPositions.includes(leader.position) &&
              leader.year === selectedYear
          )
        );

        // Extract unique positions and years
        setPositions(
          Array.from(new Set(fetchedLeaders.map((leader) => leader.position)))
        );
        setYears(
          Array.from(new Set(fetchedLeaders.map((leader) => leader.year)))
        );
      }
    };

    fetchLeaders();
  }, []);

  const handlePositionChange = (value: string) => {
    setSelectedPosition(value);
    if (Array.isArray(leaders)) {
      setfilteredLeaders(
        leaders.filter(
          (leader) => leader.position === value && leader.year === selectedYear
        )
      );
    }
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    if (Array.isArray(leaders)) {
      setfilteredLeaders(
        leaders.filter(
          (leader) =>
            leader.position === selectedPosition && leader.year === value
        )
      );
    }
  };

  return (
    <section className="flex justify-center pt-[11vh]" id="ExploreGovernance">
      <div className="w-[1161px]">
        <div className="flex justify-between">
          <span className="text-5xl font-bold border-b-2 pb-2 border-primary/20">
            Governance / Team
          </span>
          {Array.isArray(leaders) && (
            <div className="flex gap-2 w-[30%]">
              <Selector
                select={{
                  id: 1,
                  placeholder: "Positions",
                  options: positions.map((position) => ({
                    name: position,
                  })),
                }}
                classname="w-[70%]"
                onChange={(value) => {
                  handlePositionChange(value);
                }}
              />
              <Selector
                select={{
                  id: 2,
                  placeholder: "Year",
                  options: years.map((year) => ({
                    name: year,
                  })),
                }}
                classname="w-[30%]"
                onChange={(value) => {
                  handleYearChange(value);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-around pt-16 pb-10">
          {Array.isArray(leaders) ? (
            filteredLeaders.map((leader) => (
              <MemberCard leader={leader} key={leader.id} />
            ))
          ) : (
            <NoResults message={leaders.message} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Governance;

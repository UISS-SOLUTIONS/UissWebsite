"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "./types";

interface props {
  classname?: string;
  select: SelectProps;
  onChange?: (value: string) => void; // Add onChange prop
}

export function Selector({ classname, select, onChange }: props) {
  return (
    <Select onValueChange={(value) => onChange?.(value)}>
      {" "}
      {/* Trigger onChange */}
      <SelectTrigger className={`${classname ? classname : "w-[100px]"}`}>
        <SelectValue placeholder={`${select.placeholder}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {select.options.map((option, index) => (
            <SelectItem value={`${option.name}`} key={index + 1}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

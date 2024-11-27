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
}
export function Selector({ classname, select }: props) {
  return (
    <Select>
      <SelectTrigger className={`${classname != undefined ? {classname} : 'w-[100px]'}`}>
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

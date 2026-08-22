import React from "react";
import { ITabsHeader } from "../types";

const TabHeader: React.FC<ITabsHeader> = ({children, title}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[95%]">
        <span className="flex text-4xl border-b-2 py-2 border-black/20 font-bold w-full">
          {title}
        </span>
      </div>
      <div className=" w-[95%]">{children}</div>
    </div>
  );
};

export default TabHeader;

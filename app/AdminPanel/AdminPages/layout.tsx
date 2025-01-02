import React, { ReactNode } from "react";
import SideNav from "../Components/sideNav";

interface props {
  children: ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return (
    <div className="w-full h-[100vh] bg-primary flex justify-between">
      <div className="w-[15%]">
        <SideNav />
      </div>
      <div className="rounded-l-xl bg-slate-200 w-[85%] overflow-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;

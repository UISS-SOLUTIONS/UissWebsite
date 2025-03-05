import React, { ReactNode } from "react";
import SideNav from "../Components/sideNav";

interface props {
  children: ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return (
    <div className="w-full h-[100vh] bg-primary flex justify-between">
      <div className="w-[18%]">
        <SideNav />
      </div>
      <div className="bg-[#E1ECE9] w-[82%]">
        <div className="my-[3vh]">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

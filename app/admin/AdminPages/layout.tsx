import React, { ReactNode } from "react";
import SideNav from "../Components/sideNav";

interface props {
  children: ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return (
    <div className="uiss-density-admin min-h-dvh bg-canvas text-ink lg:flex">
      <a href="#admin-content" className="uiss-skip-link">
        Skip to content
      </a>
      <SideNav />
      <main id="admin-content" tabIndex={-1} className="min-w-0 flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

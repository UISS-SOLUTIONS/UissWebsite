import React, { ReactNode } from "react";
import SideNav from "../Components/sideNav";

interface props {
  children: ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return (
    <div className="uiss-density-admin min-h-dvh bg-surface text-ink lg:flex">
      <a href="#admin-content" className="fixed left-3 top-3 z-50 -translate-y-20 rounded-md bg-brand px-4 py-2 font-semibold text-brand-ink focus:translate-y-0">Skip to content</a>
      <SideNav />
      <main id="admin-content" className="min-w-0 flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

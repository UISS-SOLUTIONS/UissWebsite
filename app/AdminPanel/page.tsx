export const dynamic = "force-dynamic";

import React from "react";
import AdminLayout from "./AdminPages/layout";
import WebMaintenance from "./AdminPages/Maintenance";

const Adminpage = () => {
  return (
    <AdminLayout>
      <WebMaintenance />
    </AdminLayout>
  );
};

export default Adminpage;

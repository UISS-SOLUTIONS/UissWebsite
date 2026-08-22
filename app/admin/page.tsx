export const dynamic = "force-dynamic";

import React from "react";
import AdminLayout from "./AdminPages/layout";
import WebMaintenance from "./AdminPages/Maintenance";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Adminpage = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <AdminLayout>
      <WebMaintenance />
    </AdminLayout>
  );
};

export default Adminpage;

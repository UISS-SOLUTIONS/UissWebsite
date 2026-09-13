import React from "react";
import HomePageForm from "../../Components/homePageForm";
import ExplorePageForm from "../../Components/explorePageForm";

const WebMaintenance = () => {
  return (
    <div className="uiss-admin-page">
      <header className="mb-8"><p className="uiss-eyebrow">Website management</p><h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Maintenance</h1><p className="mt-2 max-w-2xl text-muted">Update public content and keep core information current.</p></header>
      <div className="grid gap-6 xl:grid-cols-2">
        <HomePageForm />
        <ExplorePageForm />
      </div>
    </div>
  );
};

export default WebMaintenance;

import React from "react";
import LandPage from "./LandPage";
import VisionAndMission from "@/app/(pages)/Explore/Vision&Mission";
import Governance from "@/app/(pages)/Explore/Governance";
import Events from "@/app/(pages)/Home/HomeEvents/Events";
import Quote from "@/app/(pages)/Home/Quote/Quote";

const ClubPage = () => {
  return (
    <div>
      <LandPage />
      <VisionAndMission />
      <Events />
      <Quote />
      <Governance />
    </div>
  );
};

export default ClubPage;

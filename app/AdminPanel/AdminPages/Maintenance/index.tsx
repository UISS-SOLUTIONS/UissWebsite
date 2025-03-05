import React from "react";
import HomePageForm from "../../Components/homePageForm";
import ExplorePageForm from "../../Components/explorePageForm";

const WebMaintenance = () => {
  return (
    <>
      <div className="bg-[#FAFAFA] rounded-md shadow-lg mx-10 py-3 px-8 text-3xl font-bold mb-7">
       <span className="text-ternary">Forms / </span><span>Pages</span>
      </div>
      <div className="grid grid-cols-2 gap-7 mx-10">
        <HomePageForm />
        <ExplorePageForm />
      </div>
    </>
  );
};

export default WebMaintenance;

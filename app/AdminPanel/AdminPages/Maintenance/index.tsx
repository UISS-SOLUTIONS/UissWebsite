import React from "react";
import HomePageForm from "../../Components/homePageForm";
import ExplorePageForm from "../../Components/explorePageForm";
import { auth } from "@/auth";

const WebMaintenance = async () => {
  const session = await auth()
  console.log("This is the auth session", session)
  return (
    <div className="my-[3vh]">
      <div className="bg-[#FAFAFA] rounded-md shadow-lg mx-10 py-3 px-8 text-3xl font-bold mb-7">
       <span className="text-ternary">Forms / </span><span>Pages</span>

      </div>
      <div className="grid grid-cols-2 gap-7 mx-10">
        <HomePageForm />
        <ExplorePageForm />
      </div>
    </div>
  );
};

export default WebMaintenance;

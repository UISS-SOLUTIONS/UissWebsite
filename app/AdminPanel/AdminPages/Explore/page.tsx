import React from "react";
import TabHeader from "../../Components/header";
import FormContainer from "@/app/components/form";

const Explore = () => {
  return (
    <TabHeader title="Explore Page">
      <FormContainer/>
      <span className="flex text-4xl font-bold pb-2 border-b-2 border-black/20 pt-10">
        Section One
      </span>
      <form className="flex justify-center gap-14">
        <div className="flex flex-col w-[45%]">
          <label htmlFor="LandTitle" className="text-xl font-bold pt-5">
            Land Page Title:
          </label>
          <input
            type="text"
            name="LandTitle"
            id=""
            className="py-1 px-2 text-lg focus:outline-none bg-secondary"
            placeholder="Vision & Mission"
          />
          <label htmlFor="Description" className="text-xl font-bold pt-3">
            Section One Description:
          </label>
          <textarea
            name="Description"
            id=""
            className="p-2 resize-none focus:outline-none"
            rows={2}
          />
          <label htmlFor="Description" className="flex text-xl font-bold pt-5">
            Vision Description:
          </label>
          <textarea
            name="Description"
            id=""
            className="p-2 w-full resize-none focus:outline-none"
            rows={4}
          />
          <button
            type="submit"
            className="text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-5 items-end"
          >
            Submit
          </button>
        </div>
        <div className="w-[40%]">
          <label htmlFor="Description" className="flex text-xl font-bold pt-5">
            Mission Description:
          </label>
          <textarea
            name="Description"
            id=""
            className="p-2 w-full resize-none focus:outline-none"
            rows={4}
          />
        </div>
      </form>
      <span className="flex text-4xl font-bold pb-2 border-b-2 border-black/20 pt-10">
        Section Two
      </span>
      <form className="flex justify-center gap-10">
        <div className="flex flex-col w-[45%]">
          <label htmlFor="LandTitle" className="text-xl font-bold pt-5">
            Section Two Title:
          </label>
          <input
            type="text"
            name="LandTitle"
            id=""
            className="py-1 px-2 text-lg focus:outline-none bg-secondary"
            placeholder="Our Core Values"
          />
          <label htmlFor="LandTitle" className="text-xl font-bold pt-5">
            Core Value Title:
          </label>
          <input
            type="text"
            name="LandTitle"
            id=""
            className="py-1 px-2 text-lg focus:outline-none bg-secondary"
            placeholder="Creativity"
          />
          <label htmlFor="Description" className="text-xl font-bold pt-3">
            Core Value Description:
          </label>
          <textarea
            name="Description"
            id=""
            className="p-2 resize-none focus:outline-none"
            rows={4}
          />
          <label htmlFor="LandTitle" className="text-xl font-bold pt-5">
            Core Value Title:
          </label>
          <input
            type="text"
            name="LandTitle"
            id=""
            className="py-1 px-2 text-lg focus:outline-none bg-secondary"
            placeholder="Innovation"
          />
          <label htmlFor="Description" className="text-xl font-bold pt-3">
            Core Value Description:
          </label>
          <textarea
            name="Description"
            id=""
            className="p-2 resize-none focus:outline-none"
            rows={4}
          />
          <button
            type="submit"
            className="text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-5 items-end"
          >
            Submit
          </button>
        </div>
        <div className="w-[42%] flex flex-col">
          <label htmlFor="LandTitle" className="text-xl font-bold pt-5">
            Core Value Title:
          </label>
          <input
            type="text"
            name="LandTitle"
            id=""
            className="py-1 px-2 text-lg focus:outline-none bg-secondary"
            placeholder="Humanity"
          />
          <label htmlFor="Description" className="text-xl font-bold pt-3">
            Core Value Description:
          </label>
          <textarea
            name="Description"
            id=""
            className="p-2 resize-none focus:outline-none"
            rows={4}
          />
        </div>
      </form>
    </TabHeader>
  );
};

export default Explore;

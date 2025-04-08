import { submitForm } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";

const AddClub = () => {
  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    toast.promise(submitForm(values, "http://localhost:3000/api/clubs"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
        Add Club
      </span>
      <div className="flex flex-col gap-2 pt-5">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-xl font-bold">
            Club Name:
          </label>
          <input
            type="text"
            name="title"
            id=""
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-xl font-bold pt-1">
            Description:
          </label>
          <textarea
            name="description"
            id=""
            className="p-2 text-base resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            rows={4}
          />
        </div>
        <div className="flex gap-2">
          <div className="">
            <label htmlFor="mission" className="text-xl font-bold py-1">
              Mission:
            </label>
            <textarea
              name="mission"
              id=""
              className="p-2 text-base w-full resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="vision" className="text-xl font-bold py-1">
              Vision:
            </label>
            <textarea
              name="vision"
              id=""
              className="p-2 text-base w-full resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              rows={4}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="missiondescription" className="text-xl font-bold pt-1">
            Mission & Vision Description:
          </label>
          <textarea
            name="missiondescription"
            id=""
            className="p-2 text-base resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            rows={4}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddClub;

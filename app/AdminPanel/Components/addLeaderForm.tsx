import { fetchData, submitForm } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";
import { IPosition } from "../types";
import { position } from "@/app/db/schema";
import SelectOptions from "./selectOptions";

const AddLeaderForm =() => {
  
  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    toast.promise(submitForm(values, `${process.env.NEXT_PUBLIC_API_ROUTE}/leaders`), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
        Add Leader
      </span>
      <div className="flex flex-col gap-2 pt-5">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="firstName" className="text-xl font-bold">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id=""
              required
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
          <div className="flex flex-col w-[50%]">
            <label htmlFor="lastName" className="text-xl font-bold">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id=""
              required
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[70%]">
            <SelectOptions/>
          </div>
          <div className="flex flex-col w-[30%]">
            <label htmlFor="year" className="text-xl font-bold pt-1">
              year:
            </label>
            <input
              type="number"
              name="year"
              id=""
              required
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="facebook" className="text-xl font-bold">
            Facebook Name:
          </label>
          <input
            type="text"
            name="facebook"
            id=""
            required
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="linkedIn" className="text-xl font-bold">
            Instagram Name:
          </label>
          <input
            type="text"
            required
            name="linkedIn"
            id=""
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="instagram" className="text-xl font-bold">
            LinkedIn Name:
          </label>
          <input
            type="text"
            required
            name="instagram"
            id=""
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="twitter" className="text-xl font-bold">
            Twitter Name:
          </label>
          <input
            type="text"
            required
            name="twitter"
            id=""
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddLeaderForm;

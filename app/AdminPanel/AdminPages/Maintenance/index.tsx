"use client";
import { submitForm } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";

const WebMaintenance = () => {
  const handleFormSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    toast.promise(submitForm(values, "http://localhost:3000/api/heroPage"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-7 mx-10">
      <FormWrapper onSubmit={handleFormSubmit}>
        <span className="w-full text-3xl border-b-black/30 border-[1px] uppercase font-bold px-7 py-3">
          Hero Page
        </span>
        <div className="flex flex-col gap-2 w-[90%] ">
          <label htmlFor="section" className="text-xl font-bold">
            Section:
          </label>
          <input
            type="text"
            name="section"
            id=""
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            value={"homepage"}
          />
          <label htmlFor="backgroundImg" className="text-xl font-bold">
            Background Image:
          </label>
          <input
            type="text"
            name="backgroundImg"
            id=""
            value={
              "https://plus.unsplash.com/premium_photo-1681494379901-6dc30090cd1b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
          <label htmlFor="heading" className="text-xl font-bold">
            Heading:
          </label>
          <input
            type="text"
            name="heading"
            id=""
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            placeholder="Uiss club"
          />
          <label htmlFor="description" className="text-xl font-bold pt-3">
            Description:
          </label>
          <textarea
            name="description"
            id=""
            className="p-2 resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            rows={6}
          />
        </div>
      </FormWrapper>
      <form className="flex flex-col items-center gap-2 bg-[#FAFAFA]  rounded-xl shadow-lg">
        <span className="w-full text-3xl border-b-black/30 border-[1px] uppercase font-bold px-7 py-3">
          Explore Page
        </span>
        <div className="flex flex-col gap-2 w-[90%]">
          <label htmlFor="SectionOneTitle" className="text-xl font-bold">
            Heading:
          </label>
          <input
            type="text"
            name="SectionOneTitle"
            id=""
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            value={"WELCOME NOTE"}
            disabled
          />
          <label htmlFor="description" className="text-xl font-bold pt-3">
            Welcome Note:
          </label>
          <textarea
            name="description"
            id=""
            className="p-2 resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            rows={6}
          />
          <button
            type="submit"
            className="text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit my-5 items-end"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WebMaintenance;

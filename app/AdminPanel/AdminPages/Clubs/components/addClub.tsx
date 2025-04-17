import { submitForm } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import React, { useState } from "react";
import { toast } from "sonner";

const AddClub = () => {
  const [error, setError] = useState("");
  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    if (
      typeof values.introVidId === "string" &&
      values.introVidId.includes("youtu.be/")
    ) {
      values = {
        ...values,
        introVidId: values.introVidId.split("youtu.be/")[1],
      };
    } else {
      setError("Invalid URL Provided");
    }
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
            required
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="introVidId" className="text-xl font-bold">
            Introduction Video Link:
          </label>
          <input
            type="text"
            name="introVidId"
            id=""
            required
            placeholder="https://youtu.be/kVQSdLgd1rM?si=-zvR9ammHmx7Iqk7"
            className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
          {error !== "" && <span className="text-xl font-bold text-red-700">{error}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-xl font-bold pt-1">
            Description:
          </label>
          <textarea
            name="description"
            id=""
            required
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
              required
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
              required
              className="p-2 text-base w-full resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              rows={4}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="missiondescription"
            className="text-xl font-bold pt-1"
          >
            Mission & Vision Description:
          </label>
          <textarea
            name="missiondescription"
            id=""
            required
            className="p-2 text-base resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            rows={4}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddClub;

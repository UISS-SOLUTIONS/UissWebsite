"use client";
import { submitForm } from "@/app/actions";
import AddIcon from "@/app/AdminPanel/Components/addIcon";
import FormWrapper from "@/app/components/formWrapper";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AddEvent = () => {
  const params = useParams<{ id: string }>();
  const handleSubmit = (values: Record<string, FormDataEntryValue | null>) => {
    toast.promise(
      submitForm(values, `http://localhost:3000/api/events/${params.id}`),
      {
        loading: "Submitting Form",
        success: "Event added successful",
        error: (error) => error.message,
      }
    );
  };
  return (
    <AddIcon className="p-2 bg-ternary/90 cursor-pointer rounded-md">
      <FormWrapper onSubmit={handleSubmit}>
        <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
          Add Event
        </span>
        <div className="flex flex-col gap-2 py-5">
          <label htmlFor="title" className="text-xl font-bold">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id=""
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
          <label htmlFor="title" className="text-xl font-bold">
            Held On:
          </label>
          <input
            type="datetime-local"
            name="date"
            id=""
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          />
          <label htmlFor="description" className="text-xl font-bold">
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
    </AddIcon>
  );
};

export default AddEvent;

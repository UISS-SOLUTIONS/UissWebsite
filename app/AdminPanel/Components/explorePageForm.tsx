'use client'
import { submitForm } from '@/app/actions';
import FormWrapper from '@/app/components/formWrapper';
import React from 'react'
import { toast } from 'sonner';

const ExplorePageForm = () => {
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
    <FormWrapper onSubmit={handleFormSubmit}>
        <span className="w-full text-3xl border-b-black/30 border-[1px] uppercase font-bold px-7 py-3">
          Explore
        </span>
        <div className="flex flex-col gap-2 w-[90%]">
        <label htmlFor="section" className="text-xl font-bold">
            Section:
          </label>
          <input
            type="text"
            name="section"
            id=""
            className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            value={"explore"}
          />
          <label htmlFor="backgroundImg" className="text-xl font-bold">
            Background Image:
          </label>
          <input
            type="text"
            name="backgroundImg"
            id=""
            value={
              "./welcomeBg.jpg"
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
            value={"WELCOME NOTE"}
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
        </div>
    </FormWrapper>
  )
}

export default ExplorePageForm
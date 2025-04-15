"use client";
import { fetchData, submitForm } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import React, { useState } from "react";
import { toast } from "sonner";
import SelectOptions from "./selectOptions";

const AddLeaderForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    if (!imageFile)
      return toast.error("Please upload an image before submitting");

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key] as string);
    }
    formData.append("file", imageFile);
    formData.append("upload_preset", "UissWebsite");

    toast.promise(
      fetch("https://api.cloudinary.com/v1_1/dsuixbwp7/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          values.imageUrl = data.public_id;
          submitForm(
            values,
            `${process.env.NEXT_PUBLIC_API_ROUTE}/leaders`
          );
        }),
      {
        loading: "Submitting data...",
        success: (result) =>  "Form submitted successfully!",
        error: (error) => error.message || "Failed to submit form.",
      }
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div className="flex w-full justify-center items-center ">
        <div className="w-[150px] h-[150px] flex justify-center items-center relative">
          {imagePreview !== null ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex justify-center items-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-20 text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
          <div className="absolute bottom-2 right-1">
            <label htmlFor="image" className="text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-10 cursor-pointer stroke-black/40 fill-[#efb631]"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileInput}
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg hidden"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-5">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="firstName" className="text-xl font-bold">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
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
              required
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[70%]">
            <SelectOptions />
          </div>
          <div className="flex flex-col w-[30%]">
            <label htmlFor="year" className="text-xl font-bold pt-1">
              Year:
            </label>
            <input
              type="number"
              name="year"
              required
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="facebook" className="text-xl font-bold">
              Facebook Name:
            </label>
            <input
              type="text"
              name="facebook"
              required
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
          <div className="flex flex-col w-[50%]">
            <label htmlFor="linkedIn" className="text-xl font-bold">
              Instagram Name:
            </label>
            <input
              type="text"
              required
              name="linkedIn"
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="instagram" className="text-xl font-bold">
              LinkedIn Name:
            </label>
            <input
              type="text"
              required
              name="instagram"
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
          <div className="flex flex-col w-[50%]">
            <label htmlFor="twitter" className="text-xl font-bold">
              Twitter Name:
            </label>
            <input
              type="text"
              required
              name="twitter"
              className="p-2 text-base w-full focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddLeaderForm;

"use client";

import { submitForm } from "@/app/admin/actions";
import FormWrapper from "@/app/components/formWrapper";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import SelectOptions from "./selectOptions";

const AddLeaderForm = () => {
  const formId = React.useId();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: Record<string, FormDataEntryValue | null>) => {
    if (!imageFile) return toast.error("Please upload an image before submitting");

    const formData = new FormData();

    for (const key in values) {
      const value = values[key];

      if (value !== null) formData.append(key, value);
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
          submitForm(values, "/leaders");
        }),
      {
        loading: "Submitting data...",
        success: "Form submitted successfully!",
        error: (error) => error.message || "Failed to submit form.",
      },
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div className="flex w-full justify-center items-center ">
        <div className="w-[150px] h-[150px] flex justify-center items-center relative">
          {imagePreview !== null ? (
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              sizes="150px"
              unoptimized
              className="object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-surface flex justify-center items-center rounded-full">
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
          <div className="absolute bottom-2 end-1">
            <input
              type="file"
              id={`${formId}-image`}
              aria-label="Upload leader portrait"
              accept="image/*"
              onChange={handleFileInput}
              className="peer sr-only"
            />
            <label
              htmlFor={`${formId}-image`}
              className="uiss-button grid size-11 cursor-pointer place-items-center bg-ink text-xl text-white shadow-border peer-focus-visible:shadow-focus-ring"
            >
              <span aria-hidden>+</span>
              <span className="sr-only">Upload leader portrait</span>
            </label>
          </div>
        </div>
      </div>
      <div className="uiss-form-fields">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-firstName`} className="text-sm font-medium">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id={`${formId}-firstName`}
              required
              className="uiss-field"
            />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-lastName`} className="text-sm font-medium">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id={`${formId}-lastName`}
              required
              className="uiss-field"
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid min-w-0 gap-2">
            <SelectOptions />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-year`} className="text-sm font-medium">
              Year:
            </label>
            <input
              type="number"
              name="year"
              id={`${formId}-year`}
              required
              className="uiss-field"
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-facebook`} className="text-sm font-medium">
              Facebook Name:
            </label>
            <input
              type="text"
              name="facebook"
              id={`${formId}-facebook`}
              required
              className="uiss-field"
            />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-linkedIn`} className="text-sm font-medium">
              LinkedIn profile:
            </label>
            <input
              type="text"
              required
              name="linkedIn"
              id={`${formId}-linkedIn`}
              className="uiss-field"
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-instagram`} className="text-sm font-medium">
              Instagram profile:
            </label>
            <input
              type="text"
              required
              name="instagram"
              id={`${formId}-instagram`}
              className="uiss-field"
            />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-twitter`} className="text-sm font-medium">
              Twitter Name:
            </label>
            <input
              type="text"
              required
              name="twitter"
              id={`${formId}-twitter`}
              className="uiss-field"
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddLeaderForm;

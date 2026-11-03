"use client";

import { submitForm } from "@/app/admin/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";

const HomePageForm = () => {
  const formId = React.useId();

  const handleFormSubmit = async (values: Record<string, FormDataEntryValue | null>) => {
    toast.promise(submitForm(values, "/heroPage"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };

  return (
    <FormWrapper
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-6 rounded-lg bg-panel p-6 shadow-border"
    >
      <span className="uiss-section-title w-full">Landing</span>
      <div className="uiss-form-fields">
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-section`} className="text-sm font-medium">
            Section:
          </label>
          <input
            type="text"
            name="section"
            id={`${formId}-section`}
            className="uiss-field"
            value={"homepage"}
            readOnly
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-backgroundImg`} className="text-sm font-medium">
            Background Image:
          </label>
          <input
            type="text"
            name="backgroundImg"
            id={`${formId}-backgroundImg`}
            value={
              "https://plus.unsplash.com/premium_photo-1681494379901-6dc30090cd1b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="uiss-field"
            readOnly
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-heading`} className="text-sm font-medium">
            Heading:
          </label>
          <input
            type="text"
            name="heading"
            id={`${formId}-heading`}
            className="uiss-field"
            placeholder="Uiss club"
            required
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-subheading`} className="text-sm font-medium">
            Sub Heading:
          </label>
          <input
            type="text"
            name="subheading"
            id={`${formId}-subheading`}
            className="uiss-field"
            placeholder="One Step at a Time."
            required
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-description`} className="text-sm font-medium">
            Description:
          </label>
          <textarea
            name="description"
            id={`${formId}-description`}
            className="uiss-field min-h-28 resize-y"
            rows={6}
            required
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default HomePageForm;

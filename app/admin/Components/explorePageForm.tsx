"use client";

import { submitForm } from "@/app/admin/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";

const ExplorePageForm = () => {
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
      <span className="uiss-section-title w-full">Explore</span>
      <div className="grid min-w-0 gap-2 w-full">
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-section`} className="text-sm font-medium">
            Section:
          </label>
          <input
            type="text"
            name="section"
            id={`${formId}-section`}
            className="uiss-field"
            value={"explore"}
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
            value={"./welcomeBg.avif"}
            readOnly
            className="uiss-field"
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
            value={"UNIVERSITY OF DAR ES SALAAM ICT STUDENTS' SOCIETY"}
            readOnly
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
            value={"WELCOME NOTE"}
            readOnly
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-description`} className="text-sm font-medium">
            Welcome Note:
          </label>
          <textarea
            name="description"
            id={`${formId}-description`}
            className="uiss-field min-h-28 resize-y"
            rows={6}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default ExplorePageForm;

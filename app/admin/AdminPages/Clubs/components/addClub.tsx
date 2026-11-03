import { submitForm } from "@/app/admin/actions";
import FormWrapper from "@/app/components/formWrapper";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const AddClub = () => {
  const formId = React.useId();

  const [error, setError] = useState("");

  const handleSubmit = async (values: Record<string, FormDataEntryValue | null>) => {
    const video = z.string().safeParse(values.introVidId);

    if (video.success && video.data.includes("youtu.be/")) {
      values = {
        ...values,
        introVidId: video.data.split("youtu.be/")[1],
      };
    } else {
      setError("Invalid URL Provided");
    }

    toast.promise(submitForm(values, "/clubs"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl font-semibold">Add Club</span>
      <div className="uiss-form-fields">
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-title`} className="text-sm font-medium">
            Club Name:
          </label>
          <input type="text" name="title" id={`${formId}-title`} required className="uiss-field" />
        </div>
        <div className="grid min-w-0 gap-2">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-introVidId`} className="text-sm font-medium">
              Introduction Video Link:
            </label>
            <input
              type="text"
              name="introVidId"
              id={`${formId}-introVidId`}
              required
              placeholder="https://youtu.be/kVQSdLgd1rM?si=-zvR9ammHmx7Iqk7"
              className="uiss-field"
            />
          </div>
          {error !== "" && <span className="text-xl font-semibold text-danger">{error}</span>}
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-description`} className="text-sm font-medium">
            Description:
          </label>
          <textarea
            name="description"
            id={`${formId}-description`}
            required
            className="uiss-field min-h-28 resize-y"
            rows={4}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-mission`} className="text-sm font-medium">
              Mission:
            </label>
            <textarea
              name="mission"
              id={`${formId}-mission`}
              required
              className="uiss-field min-h-28 resize-y"
              rows={4}
            />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-vision`} className="text-sm font-medium">
              Vision:
            </label>
            <textarea
              name="vision"
              id={`${formId}-vision`}
              required
              className="uiss-field min-h-28 resize-y"
              rows={4}
            />
          </div>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-missiondescription`} className="text-sm font-medium">
            Mission & Vision Description:
          </label>
          <textarea
            name="missiondescription"
            id={`${formId}-missiondescription`}
            required
            className="uiss-field min-h-28 resize-y"
            rows={4}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddClub;

"use client";

import { updateData } from "@/app/admin/actions";
import FormWrapper from "@/app/components/formWrapper";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface props {
  title: string;
}

const UpdateVisionMission: React.FC<props> = ({ title }) => {
  const formId = React.useId();

  const params = useParams<{ id: string }>();

  const handleSubmit = async (values: Record<string, FormDataEntryValue | null>) => {
    toast.promise(
      updateData(
        values,
        title === "Description" ? `/clubs/${params.id}` : `/visionMission/${params.id}`,
      ),
      {
        loading: `updating ${title}`,
        success: `updated ${title} successfully`,
        error: `Error occured when updating ${title}`,
      },
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl font-semibold">Edit {title}</span>
      <div className="uiss-form-fields">
        {title === "Description" || title === "Vision & Mission" ? (
          <>
            <div className="grid min-w-0 gap-2">
              <label htmlFor={`${formId}-description`} className="text-sm font-medium">
                Description:
              </label>
              <textarea
                name="description"
                id={`${formId}-description`}
                className="uiss-field min-h-28 resize-y"
                rows={6}
              />
            </div>
          </>
        ) : (
          title === "Mission" && (
            <>
              <div className="grid min-w-0 gap-2">
                <label htmlFor={`${formId}-mission`} className="text-sm font-medium">
                  Mission:
                </label>
                <textarea
                  name="mission"
                  id={`${formId}-mission`}
                  className="uiss-field min-h-28 resize-y"
                  rows={6}
                />
              </div>
            </>
          )
        )}
        {title === "Vision" && (
          <>
            <div className="grid min-w-0 gap-2">
              <label htmlFor={`${formId}-vision`} className="text-sm font-medium">
                vision:
              </label>
              <textarea
                name="vision"
                id={`${formId}-vision`}
                className="uiss-field min-h-28 resize-y"
                rows={6}
              />
            </div>
          </>
        )}
      </div>
    </FormWrapper>
  );
};

export default UpdateVisionMission;

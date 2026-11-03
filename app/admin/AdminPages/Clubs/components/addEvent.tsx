"use client";

import { submitForm } from "@/app/admin/actions";
import AddIcon from "@/app/admin/Components/addIcon";
import FormWrapper from "@/app/components/formWrapper";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AddEvent = () => {
  const formId = React.useId();

  const params = useParams<{ id: string }>();

  const handleSubmit = (values: Record<string, FormDataEntryValue | null>) => {
    toast.promise(submitForm(values, `/events/${params.id}`), {
      loading: "Submitting Form",
      success: "Event added successful",
      error: (error) => error.message,
    });
  };

  return (
    <AddIcon
      className="uiss-button uiss-pressable grid size-11 place-items-center bg-ink text-white hover:bg-ink/85"
      aria-label="Add event"
    >
      <FormWrapper onSubmit={handleSubmit}>
        <span className="flex w-full text-2xl font-semibold">Add Event</span>
        <div className="uiss-form-fields">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-title`} className="text-sm font-medium">
              Title:
            </label>
            <input type="text" name="title" id={`${formId}-title`} className="uiss-field" />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-date`} className="text-sm font-medium">
              Held On:
            </label>
            <input type="datetime-local" name="date" id={`${formId}-date`} className="uiss-field" />
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
            />
          </div>
        </div>
      </FormWrapper>
    </AddIcon>
  );
};

export default AddEvent;

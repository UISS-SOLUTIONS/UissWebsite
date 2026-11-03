import React from "react";
import FormWrapper from "../../components/formWrapper";
import { submitForm } from "@/app/admin/actions";
import { toast } from "sonner";
import { coreValueFields, type AdminRow } from "@/lib/admin-data";

interface props {
  add?: boolean;
  data?: AdminRow;
}

const CoreValueForm: React.FC<props> = ({ add, data }) => {
  const formId = React.useId();

  const fields = coreValueFields.parse(data ?? {});

  const handleSubmit = async (values: Record<string, FormDataEntryValue | null>) => {
    toast.promise(submitForm(values, "/coreValues"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl font-semibold">
        {add ? "Add Core Value" : "Edit Core Value"}
      </span>
      <div className="uiss-form-fields">
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-value`} className="text-sm font-medium">
            Value:
          </label>
          <input
            type="text"
            name="value"
            id={`${formId}-value`}
            className="uiss-field"
            defaultValue={add ? "" : fields.value}
            readOnly={add ? false : true}
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-description`} className="text-sm font-medium">
            Description:
          </label>
          <textarea
            name="description"
            id={`${formId}-description`}
            defaultValue={add ? "" : fields.description}
            className="uiss-field min-h-28 resize-y"
            rows={6}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default CoreValueForm;

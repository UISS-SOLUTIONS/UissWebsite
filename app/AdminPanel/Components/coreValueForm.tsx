import React from "react";
import FormWrapper from "../../components/formWrapper";
import { submitForm } from "../../actions";
import { toast } from "sonner";

interface props{
  add?: boolean;
}


const CoreValueForm:React.FC<props> = ({add}) => {
  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    toast.promise(submitForm(values, "http://localhost:3000/api/coreValues"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
        {!add ? "Edit Core Value": "Add Core Value"}
      </span>
      <div className="flex flex-col gap-2 py-5">
        <label htmlFor="value" className="text-xl font-bold">
          Value:
        </label>
        <input
          type="text"
          name="value"
          id=""
          className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
          defaultValue={add ? "" : "Creativity"}
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
  );
};

export default CoreValueForm;

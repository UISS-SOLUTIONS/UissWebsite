import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormWrapperProps {
  onSubmit: (values: Record<string, FormDataEntryValue | null>) => void;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ onSubmit, children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Record<string, FormDataEntryValue | null> = {};

    formData.forEach((value, key) => {
      values[key] = value;
    });

    onSubmit(values);
  };

  return (
    <form
      className="flex flex-col items-center gap-2 bg-[#FAFAFA] rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      {children}
      <div className="w-[90%]">
        <button
          type="submit"
          className="text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-2 mb-3"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormWrapper;

import React from "react";

interface FormWrapperProps {
  onSubmit: (values: Record<string, FormDataEntryValue | null>) => void;
  children: React.ReactNode;
  className?: string
}

const FormWrapper: React.FC<FormWrapperProps> = ({ onSubmit, children, className }) => {
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
      className={className}
      onSubmit={handleSubmit}
    >
      {children}
      <div className="w-full">
        <button
          type="submit"
          className="uiss-pressable mt-4 min-h-11 rounded-md bg-brand px-5 py-2 font-semibold text-brand-ink"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormWrapper;

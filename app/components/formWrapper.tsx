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

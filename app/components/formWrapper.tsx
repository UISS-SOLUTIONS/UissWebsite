import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  onSubmit: (values: Record<string, FormDataEntryValue | null>) => void;
  children: React.ReactNode;
  className?: string;
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
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit}>
      {children}
      <div className="flex w-full justify-end">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormWrapper;

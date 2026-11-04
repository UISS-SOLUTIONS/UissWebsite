import { submitForm } from "@/app/admin/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";

const AddUserForm = () => {
  const formId = React.useId();

  const handleSubmit = async (values: Record<string, FormDataEntryValue | null>) => {
    toast.promise(submitForm(values, "/users"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl font-semibold">Add User</span>
      <div className="uiss-form-fields">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-firstName`} className="text-sm font-medium">
              First name:
            </label>
            <input type="text" name="firstName" id={`${formId}-firstName`} className="uiss-field" />
          </div>
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${formId}-lastName`} className="text-sm font-medium">
              Last name:
            </label>
            <input type="text" name="lastName" id={`${formId}-lastName`} className="uiss-field" />
          </div>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-email`} className="text-sm font-medium">
            E-mail:
          </label>
          <input type="email" name="email" id={`${formId}-email`} className="uiss-field" />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-clubId`} className="text-sm font-medium">
            Select Club
          </label>
          <select id={`${formId}-clubId`} name="clubId" className="uiss-field">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
            <option value={5}>Option 5</option>
            <option value={6}>Option 6</option>
          </select>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-role`} className="text-sm font-medium">
            Select Role
          </label>
          <select id={`${formId}-role`} name="role" className="uiss-field">
            <option value="student">student</option>
            <option value="staff">staff</option>
          </select>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-password`} className="text-sm font-medium">
            Password:
          </label>
          <input type="password" name="password" id={`${formId}-password`} className="uiss-field" />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${formId}-confpasswd`} className="text-sm font-medium">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confpasswd"
            id={`${formId}-confpasswd`}
            className="uiss-field"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddUserForm;

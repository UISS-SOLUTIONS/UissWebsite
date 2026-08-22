import { submitForm } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import React from "react";
import { toast } from "sonner";

const AddUserForm = () => {
  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    toast.promise(submitForm(values, "http://localhost:3000/api/users"), {
      loading: "Submitting data...",
      success: (result) => result.message || "Form submitted successfully!",
      error: (error) => error.message || "Failed to submit form.",
    });
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
        Add User
      </span>
      <div className="flex flex-col gap-2 py-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-xl font-bold">
              FirstName:
            </label>
            <input
              type="text"
              name="firstName"
              id=""
              className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
           
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-xl font-bold">
              LastName:
            </label>
            <input
              type="text"
              name="lastName"
              id=""
              className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
         
            />
          </div>
        </div>
        <label htmlFor="email" className="text-xl font-bold">
          E-mail:
        </label>
        <input
          type="email"
          name="email"
          id=""
          className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
        />
        <label htmlFor="clubId" className="font-bold">
          Select Club
        </label>
        <select
          id="options"
          name="clubId"
          className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
        >
          <option value={1}>Option 1</option>
          <option value={2}>Option 2</option>
          <option value={3}>Option 3</option>
          <option value={4}>Option 4</option>
          <option value={5}>Option 5</option>
          <option value={6}>Option 6</option>
        </select>
        <label htmlFor="role" className="font-bold">
          Select Role
        </label>
        <select
          id="options"
          name="role"
          className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
        >
          <option value="student">student</option>
          <option value="staff">staff</option>
        </select>
        <label htmlFor="password" className="text-xl font-bold">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id=""
          className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
        />
        <label htmlFor="confpasswd" className="text-xl font-bold">
          Confirm Password:
        </label>
        <input
          type="password"
          name="confpasswd"
          id=""
          className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
        />
      </div>
    </FormWrapper>
  );
};

export default AddUserForm;

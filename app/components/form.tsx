"use client";
import React, { useState } from "react";
import { IFormContainer } from "./types";

const FormContainer = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  };
  return (
    <form
      className="flex flex-col justify-center gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-[90%]">
        <label htmlFor="LandTitle" className="text-xl font-bold pt-5">
          Land Page Title:
        </label>
        <input
          type="text"
          name="LandTitle"
          id=""
          className="py-1 px-2 text-lg focus:outline-none bg-secondary"
          placeholder="Welcome Note"
          value={"Welcome Note"}
          disabled
        />
        <label htmlFor="Description" className="text-xl font-bold pt-3">
          Land Page Description:
        </label>
        <textarea
          name="Description"
          id=""
          className="p-2 resize-none focus:outline-none"
          onChange={handleChange}
          rows={6}
        />
      </div>
      <button
        type="submit"
        className="text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-5 items-end"
      >
        Submit
      </button>
    </form>
  );
};

export default FormContainer;

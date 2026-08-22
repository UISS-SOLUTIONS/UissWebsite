"use client";
import { updateData } from "@/app/actions";
import FormWrapper from "@/app/components/formWrapper";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface props {
  title: string;
}

const UpdateVisionMission: React.FC<props> = ({ title }) => {
  const params = useParams<{ id: string }>();
  const handleSubmit = async (
    values: Record<string, FormDataEntryValue | null>
  ) => {
    toast.promise(
      updateData(
        values,
        title === "Description"
          ? `http://localhost:3000/api/clubs/${params.id}`
          : `http://localhost:3000/api/visionMission/${params.id}`
      ),
      {
        loading: `updating ${title}`,
        success: `updated ${title} successfully`,
        error: `Error occured when updating ${title}`,
      }
    );
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <span className="flex w-full text-2xl uppercase font-bold pb-3 border-b-[1px] border-black/50">
        Edit {title}
      </span>
      <div className="flex flex-col gap-2 py-5">
        {title === "Description" || title === "Vision & Mission" ? (
          <>
            <label htmlFor="description" className="text-xl font-bold">
              Description:
            </label>
            <textarea
              name="description"
              id=""
              className="p-2 resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              rows={6}
            />
          </>
        ) : (
          title === "Mission" && (
            <>
              <label htmlFor="mission" className="text-xl font-bold">
                Mission:
              </label>
              <textarea
                name="mission"
                id=""
                className="p-2 resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
                rows={6}
              />
            </>
          )
        )}
        {title === "Vision" && (
          <>
            <label htmlFor="vision" className="text-xl font-bold">
              vision:
            </label>
            <textarea
              name="vision"
              id=""
              className="p-2 resize-none focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              rows={6}
            />
          </>
        )}
      </div>
    </FormWrapper>
  );
};

export default UpdateVisionMission;

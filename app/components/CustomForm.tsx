"use client";

import { useActionState } from "react";
import {
  initialMembershipActionState,
  submitMembershipApplication,
} from "@/app/(pages)/Membership/actions";

export default function CustomForm() {
  const [state, formAction, pending] = useActionState(
    submitMembershipApplication,
    initialMembershipActionState
  );

  return (
    <>
      <div className="flex flex-col pb-4">
        <span className="text-4xl font-bold">Join UISS</span>
        <span className="pt-3 opacity-70">
          Applications are open year-round and reviewed weekly.
        </span>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-y-1 font-bold">
            First name
            <input required maxLength={100} name="firstName" autoComplete="given-name" className="rounded-md border border-black/20 px-3 py-2 font-normal focus:outline-none" />
          </label>
          <label className="flex flex-col gap-y-1 font-bold">
            Last name
            <input required maxLength={100} name="lastName" autoComplete="family-name" className="rounded-md border border-black/20 px-3 py-2 font-normal focus:outline-none" />
          </label>
        </div>

        <label className="flex flex-col gap-y-1 font-bold">
          University email
          <input required type="email" maxLength={254} name="email" autoComplete="email" className="rounded-md border border-black/20 px-3 py-2 font-normal focus:outline-none" />
        </label>

        <label className="flex flex-col gap-y-1 font-bold">
          Club interest
          <input required maxLength={120} name="clubInterest" placeholder="For example, cybersecurity or programming" className="rounded-md border border-black/20 px-3 py-2 font-normal focus:outline-none" />
        </label>

        <label className="flex flex-col gap-y-1 font-bold">
          Message <span className="font-normal opacity-60">Optional</span>
          <textarea maxLength={1000} name="message" rows={4} className="resize-none rounded-md border border-black/20 px-3 py-2 font-normal focus:outline-none" />
        </label>

        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {state.status !== "idle" && (
          <p role="status" className={state.status === "success" ? "text-green-700" : "text-red-700"}>
            {state.message}
          </p>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={pending} className="rounded-md bg-ternary px-4 py-2 text-lg font-bold disabled:cursor-not-allowed disabled:opacity-60">
            {pending ? "Submitting..." : "Submit application"}
          </button>
        </div>
      </form>
    </>
  );
}

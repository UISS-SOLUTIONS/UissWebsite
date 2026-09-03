"use client";

import { useActionState } from "react";
import {
  submitMembershipApplication,
  type MembershipActionState,
} from "@/app/membership/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialMembershipActionState: MembershipActionState = {
  status: "idle",
  message: "",
};

export default function CustomForm() {
  const [state, formAction, pending] = useActionState(
    submitMembershipApplication,
    initialMembershipActionState
  );

  return (
    <>
      <div className="border-b border-line pb-6">
        <h2 className="text-3xl font-bold tracking-tight">Apply for membership</h2>
        <p className="mt-2 leading-7 text-muted">
          All fields except the message are required. We will reply by email.
        </p>
      </div>
      <form action={formAction} className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              required
              maxLength={100}
              id="firstName"
              name="firstName"
              autoComplete="given-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              required
              maxLength={100}
              id="lastName"
              name="lastName"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">University email</Label>
          <Input
            required
            type="email"
            maxLength={254}
            id="email"
            name="email"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clubInterest">Club interest</Label>
          <Input
            required
            maxLength={120}
            id="clubInterest"
            name="clubInterest"
            placeholder="For example, cybersecurity or programming"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="font-normal text-muted">Optional</span>
          </Label>
          <Textarea maxLength={1000} id="message" name="message" rows={4} />
        </div>

        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {state.status !== "idle" && (
          <p
            role="status"
            aria-live="polite"
            className={
              state.status === "success"
                ? "rounded-md border border-success/30 bg-success/5 px-4 py-3 text-success"
                : "rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-danger"
            }
          >
            {state.message}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={pending}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {pending ? "Submitting..." : "Submit application"}
          </Button>
        </div>
      </form>
    </>
  );
}

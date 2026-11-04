"use client";

import { useActionState, useState } from "react";
import { submitMembershipApplication, type MembershipActionState } from "@/app/membership/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEntranceMotion } from "@/hooks/use-entrance-motion";

const initialMembershipActionState: MembershipActionState = {
  status: "idle",
  message: "",
};

export default function CustomForm({ initialClub }: { initialClub?: string }) {
  const [state, formAction, pending] = useActionState(
    submitMembershipApplication,
    initialMembershipActionState,
  );

  const [animateFeedback, setAnimateFeedback] = useState(false);

  const feedbackRef = useEntranceMotion<HTMLParagraphElement>({
    enabled: state.status === "success" && animateFeedback,
    fromOpacity: 0.6,
    duration: "control",
  });

  return (
    <>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Apply for membership</h2>
        <p className="mt-2 leading-7 text-muted">
          All fields except the message are required. We will reply by email.
        </p>
      </div>
      <form action={formAction} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
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
            defaultValue={initialClub}
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
            ref={feedbackRef}
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 rounded-md bg-panel px-4 py-3 text-sm leading-6 text-ink shadow-border"
          >
            <span
              aria-hidden
              className={`mt-2 size-2 shrink-0 rounded-full ${state.status === "success" ? "bg-success" : "bg-danger"}`}
            />
            {state.message}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            onClick={(event) => setAnimateFeedback(event.detail > 0)}
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

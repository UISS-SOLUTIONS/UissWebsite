"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-control bg-panel px-3 py-2 text-base text-ink shadow-border placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-1 aria-invalid:ring-danger",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

"use client";

import type { CSSProperties } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "uiss-button uiss-pressable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-sm font-normal focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-ink/85",
        destructive: "bg-danger text-white hover:bg-danger/90",
        outline: "bg-panel text-ink shadow-border hover:bg-surface",
        secondary: "bg-ink text-white hover:bg-ink/85",
        ghost: "text-ink hover:bg-surface",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 lg:h-10",
        sm: "h-11 px-3 lg:h-9",
        lg: "h-12 px-6",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonElementProps = Omit<ButtonPrimitive.Props, "className" | "style"> & {
  className?: string;
  style?: CSSProperties;
};

export type ButtonProps = ButtonElementProps & VariantProps<typeof buttonVariants>;

function ButtonLink({
  render,
  disabled = false,
  focusableWhenDisabled,
  ref,
  onClick,
  tabIndex,
  className,
  style,
  ...props
}: ButtonElementProps) {
  return useRender({
    defaultTagName: "a",
    render,
    ref,
    state: { disabled },
    props: mergeProps<"button">(
      {
        ...props,
        onClick,
        className,
        style,
      },
      {
        "aria-disabled": disabled || undefined,
        tabIndex: disabled && !focusableWhenDisabled ? -1 : tabIndex,
        onClick: (event) => {
          if (disabled) {
            event.preventDefault();
            event.preventBaseUIHandler();
          }
        },
      },
    ),
  });
}

function Button({ className, variant, size, nativeButton = true, ...props }: ButtonProps) {
  const Component = nativeButton ? ButtonPrimitive : ButtonLink;

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

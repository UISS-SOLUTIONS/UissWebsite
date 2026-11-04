"use client";

import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function NavigationMenu({ className, children, ...props }: NavigationMenuPrimitive.Root.Props) {
  const anchor = React.useRef<HTMLElement>(null);

  return (
    <NavigationMenuPrimitive.Root
      ref={anchor}
      delay={0}
      closeDelay={80}
      className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport anchor={anchor} />
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "uiss-button group inline-flex h-8 w-max items-center justify-center rounded-control bg-transparent px-3 text-sm font-normal text-muted transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-accent data-popup-open:text-accent-foreground",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-px ml-1 size-3 group-data-popup-open:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn("w-max max-w-[calc(100vw-3rem)]", className)}
      {...props}
    />
  );
}

const NavigationMenuLink = NavigationMenuPrimitive.Link;

function NavigationMenuViewport({
  className,
  anchor,
  ...props
}: NavigationMenuPrimitive.Viewport.Props & {
  anchor?: React.RefObject<HTMLElement | null>;
}) {
  return (
    <NavigationMenuPrimitive.Portal container={anchor}>
      <NavigationMenuPrimitive.Positioner anchor={anchor} align="start" sideOffset={12}>
        <NavigationMenuPrimitive.Popup
          render={<div />}
          className="origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-raised"
        >
          <NavigationMenuPrimitive.Viewport className={className} {...props} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

const NavigationMenuIndicator = NavigationMenuPrimitive.Arrow;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

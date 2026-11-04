"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LogOut from "./logOut";
import { cn } from "@/lib/utils";

const items = [
  ["Maintenance", "/admin"],
  ["Users", "/admin/AdminPages/Users"],
  ["Core values", "/admin/AdminPages/CoreValues"],
  ["Clubs", "/admin/AdminPages/Clubs"],
  ["Leaders", "/admin/AdminPages/Leaders"],
  ["Testimonials", "/admin/AdminPages/Testimonials"],
] as const;

export default function SideNav() {
  const pathname = usePathname();

  return <SideNavContent key={pathname} pathname={pathname} />;
}

function SideNavContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-line bg-panel px-4 text-ink lg:hidden">
        <Link
          href="/admin"
          aria-label="UISS administration"
          className="flex items-center gap-3 font-semibold"
        >
          <Image
            src="/brand/uiss-mark.avif"
            width={256}
            height={220}
            sizes="32px"
            className="h-8 w-auto grayscale brightness-0"
            alt=""
          />{" "}
          Administration
        </Link>
        <button
          ref={triggerRef}
          type="button"
          className="uiss-pressable grid size-11 place-items-center rounded-md bg-panel shadow-border"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <aside
        className={cn(
          "fixed inset-x-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto overscroll-contain bg-panel p-6 text-ink shadow-border lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0",
          open ? "flex" : "hidden",
        )}
        aria-label="Administration navigation"
      >
        <Link
          href="/admin"
          aria-label="UISS administration"
          className="hidden items-center gap-3 pb-0 lg:flex"
        >
          <Image
            src="/brand/uiss-mark.avif"
            width={256}
            height={220}
            sizes="40px"
            className="h-10 w-auto grayscale brightness-0"
            alt=""
          />
          <span>
            <span className="block font-display text-xl font-semibold">UISS</span>
            <span className="text-sm text-muted">Administration</span>
          </span>
        </Link>
        <nav className="mt-0 flex-1 lg:mt-8">
          <ul className="space-y-1">
            {items.map(([label, href]) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "uiss-pressable flex min-h-11 items-center rounded-md px-4 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-ink",
                      active && "bg-surface text-ink hover:bg-surface hover:text-ink",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <LogOut />
      </aside>
    </>
  );
}

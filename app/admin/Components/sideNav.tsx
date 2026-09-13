"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-line bg-ink px-4 text-canvas lg:hidden">
        <Link href="/admin" className="flex items-center gap-3 font-semibold"><Image src="/UISS_LOGO.png" width={40} height={40} alt="UISS" /> Administration</Link>
        <button type="button" className="uiss-pressable grid size-11 place-items-center rounded-md border border-canvas/20" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
      <aside className={cn("fixed inset-x-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col bg-ink p-5 text-canvas lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0", open ? "flex" : "hidden")} aria-label="Administration navigation">
        <Link href="/admin" className="hidden items-center gap-3 border-b border-canvas/15 pb-6 lg:flex"><Image src="/UISS_LOGO.png" width={52} height={52} alt="UISS" /><span><span className="block font-display text-xl font-semibold">UISS</span><span className="text-sm text-canvas/60">Administration</span></span></Link>
        <nav className="mt-4 flex-1 lg:mt-8"><ul className="space-y-1">{items.map(([label, href]) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <li key={href}><Link href={href} aria-current={active ? "page" : undefined} className={cn("uiss-pressable flex min-h-11 items-center rounded-md px-4 py-2.5 text-sm font-semibold text-canvas/70 hover:bg-canvas/10 hover:text-canvas", active && "bg-brand text-brand-ink hover:bg-brand hover:text-brand-ink")}>{label}</Link></li>; })}</ul></nav>
        <LogOut />
      </aside>
    </>
  );
}

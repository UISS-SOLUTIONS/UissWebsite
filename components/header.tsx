"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Blocks,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  Code2,
  FolderKanban,
  Menu,
  Network,
  Palette,
  type LucideIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

type NavigationCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

const clubItems: NavigationCard[] = [
  { title: "Artificial Intelligence", href: "/clubs/artificial-intelligence", description: "Build practical AI and machine-learning systems.", icon: BrainCircuit },
  { title: "Blockchain", href: "/clubs/blockchain", description: "Explore smart contracts, Web3, and cryptography.", icon: Blocks },
  { title: "Data Science", href: "/clubs/data-science", description: "Turn real data into useful evidence and insights.", icon: ChartNoAxesCombined },
  { title: "Networking", href: "/clubs/networking", description: "Configure, secure, and troubleshoot connected systems.", icon: Network },
  { title: "Software Development", href: "/clubs/software-development", description: "Build reliable web, mobile, and open-source software.", icon: Code2 },
  { title: "UI/UX & Graphic Design", href: "/clubs/ui-ux-graphic-design", description: "Research and craft inclusive digital experiences.", icon: Palette },
];

const exploreItems: NavigationCard[] = [
  { title: "Events", href: "/events", description: "Join workshops, meetups, and student-led experiences.", icon: CalendarDays },
  { title: "Projects", href: "/projects", description: "Discover practical work built by UISS students.", icon: FolderKanban },
];

const directItems = [
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
];

function DesktopNavigationCard({ item }: { item: NavigationCard }) {
  const Icon = item.icon;

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={item.href}
          className="group flex h-full gap-3 rounded-xl p-3 text-left transition-colors duration-100 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-ink [&_svg]:size-4">
            <Icon aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-ink">{item.title}</span>
            <span className="mt-1 block text-sm leading-snug text-muted">{item.description}</span>
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MobileNavigationLink({
  item,
  onNavigate,
}: {
  item: Pick<NavigationCard, "title" | "href" | "icon">;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-label={item.title}
        className="flex min-h-10 items-center gap-3 rounded-lg px-1 py-1.5 text-sm font-medium text-ink transition-colors duration-100 hover:bg-surface focus-visible:bg-surface"
      >
        <span className="flex size-8 shrink-0 items-center justify-center text-ink [&_svg]:size-4">
          <Icon aria-hidden="true" />
        </span>
        {item.title}
      </Link>
    </li>
  );
}

export const HeroHeader = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClubsOpen, setMobileClubsOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileClubsOpen(false);
    setMobileExploreOpen(false);
  };

  const handleMobileOpenChange = (open: boolean) => {
    setMobileOpen(open);
    if (!open) {
      setMobileClubsOpen(false);
      setMobileExploreOpen(false);
    }
  };

  const handleMobileClubsChange = (open: boolean) => {
    setMobileClubsOpen(open);
    if (open) setMobileExploreOpen(false);
  };

  const handleMobileExploreChange = (open: boolean) => {
    setMobileExploreOpen(open);
    if (open) setMobileClubsOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMobileOpen(false);
      setMobileClubsOpen(false);
      setMobileExploreOpen(false);
      window.requestAnimationFrame(() => mobileTriggerRef.current?.focus());
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <Collapsible open={mobileOpen} onOpenChange={handleMobileOpenChange} asChild>
      <header className="h-[4.25rem] text-ink lg:h-[3.75rem]">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3">
          <div className="pointer-events-auto mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line/90 bg-canvas/80 shadow-[0_4px_12px_-6px_rgb(17_17_17_/_0.22)] ring-1 ring-line/50 backdrop-blur-xl lg:overflow-visible">
            <nav aria-label="Main navigation">
              <div className="relative flex h-[54px] items-center justify-between gap-8 px-6 lg:h-[46px] lg:px-2">
                <Link
                  href="/"
                  aria-label="UISS home"
                  className="-ml-3 flex h-10 w-11 items-center justify-center rounded-xl transition-colors duration-100 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 lg:-m-1"
                >
                  <Image src="/brand/uiss-mark.avif" alt="" width={256} height={220} priority sizes="44px" className="h-10 w-auto object-contain" />
                </Link>

                <div className="hidden flex-1 justify-center lg:flex">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Clubs</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[44rem] p-3">
                            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">Technical communities</p>
                            <ul className="grid grid-cols-2 gap-1">{clubItems.map((item) => <DesktopNavigationCard key={item.href} item={item} />)}</ul>
                            <Separator className="my-2" />
                            <NavigationMenuLink asChild>
                              <Link href="/clubs" className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-ink transition-colors duration-100 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none [&_svg]:size-4">View all clubs <ArrowRight aria-hidden="true" /></Link>
                            </NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-96 p-3">
                            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">Explore UISS</p>
                            <ul className="grid gap-1">{exploreItems.map((item) => <DesktopNavigationCard key={item.href} item={item} />)}</ul>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {directItems.map((item) => (
                        <NavigationMenuItem key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link className={navigationMenuTriggerStyle()} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.title}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <div className="hidden lg:block">
                  <Button asChild variant="secondary" size="sm" className="h-8 rounded-lg px-3 text-xs"><Link href="/membership">Join UISS</Link></Button>
                </div>

                <CollapsibleTrigger asChild>
                  <Button ref={mobileTriggerRef} variant="outline" size="icon" className="rounded-xl lg:hidden" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-controls="mobile-navigation">
                    {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent id="mobile-navigation" className="max-h-[calc(100dvh-5rem)] origin-top overflow-y-auto border-t border-line/80 transition-[opacity,transform,max-height] duration-150 ease-out motion-reduce:transition-none data-[state=closed]:pointer-events-none data-[state=closed]:max-h-0 data-[state=closed]:-translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:max-h-[calc(100dvh-5rem)] data-[state=open]:translate-y-0 data-[state=open]:opacity-100 lg:hidden">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-5">
                  <Collapsible open={mobileClubsOpen} onOpenChange={handleMobileClubsChange}>
                    <CollapsibleTrigger className="group flex min-h-14 w-full items-center justify-between border-b border-line text-left text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 [&_svg]:size-4">Clubs <ChevronDown className="transition-transform duration-100 group-data-[state=open]:rotate-180" aria-hidden="true" /></CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-[height,opacity] duration-150 ease-out motion-reduce:transition-none data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
                      <ul className="grid gap-0.5 py-2 sm:grid-cols-2">{clubItems.map((item) => <MobileNavigationLink key={item.href} item={item} onNavigate={closeMobileMenu} />)}</ul>
                      <Link href="/clubs" onClick={closeMobileMenu} className="mb-2 flex min-h-10 items-center justify-between rounded-lg px-1 text-sm font-semibold text-ink transition-colors duration-100 hover:bg-surface focus-visible:bg-surface [&_svg]:size-4">View all clubs <ArrowRight aria-hidden="true" /></Link>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible open={mobileExploreOpen} onOpenChange={handleMobileExploreChange}>
                    <CollapsibleTrigger className="group flex min-h-14 w-full items-center justify-between border-b border-line text-left text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 [&_svg]:size-4">Explore <ChevronDown className="transition-transform duration-100 group-data-[state=open]:rotate-180" aria-hidden="true" /></CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-[height,opacity] duration-150 ease-out motion-reduce:transition-none data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
                      <ul className="grid gap-0.5 py-2 sm:grid-cols-2">{exploreItems.map((item) => <MobileNavigationLink key={item.href} item={item} onNavigate={closeMobileMenu} />)}</ul>
                    </CollapsibleContent>
                  </Collapsible>

                  {directItems.map((item) => <Link key={item.href} href={item.href} onClick={closeMobileMenu} aria-current={pathname === item.href ? "page" : undefined} className="flex min-h-14 items-center border-b border-line text-lg font-semibold text-ink transition-colors duration-100 hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2">{item.title}</Link>)}
                  <Button asChild variant="secondary" size="lg" className="mt-5 h-10 rounded-lg"><Link href="/membership" onClick={closeMobileMenu}>Join UISS</Link></Button>
                </div>
              </CollapsibleContent>
            </nav>
          </div>
        </div>
      </header>
    </Collapsible>
  );
};

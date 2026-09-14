"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";

type NavigationCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

const clubItems: NavigationCard[] = [
  {
    title: "Artificial Intelligence",
    href: "/clubs/artificial-intelligence",
    description: "Build practical AI and machine-learning systems.",
    icon: BrainCircuit,
  },
  {
    title: "Blockchain",
    href: "/clubs/blockchain",
    description: "Explore smart contracts, Web3, and cryptography.",
    icon: Blocks,
  },
  {
    title: "Data Science",
    href: "/clubs/data-science",
    description: "Turn real data into useful evidence and insights.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Networking",
    href: "/clubs/networking",
    description: "Configure, secure, and troubleshoot connected systems.",
    icon: Network,
  },
  {
    title: "Software Development",
    href: "/clubs/software-development",
    description: "Build reliable web, mobile, and open-source software.",
    icon: Code2,
  },
  {
    title: "UI/UX & Graphic Design",
    href: "/clubs/ui-ux-graphic-design",
    description: "Research and craft inclusive digital experiences.",
    icon: Palette,
  },
];

const exploreItems: NavigationCard[] = [
  {
    title: "Events",
    href: "/events",
    description: "Join workshops, meetups, and student-led experiences.",
    icon: CalendarDays,
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Discover practical work built by UISS students.",
    icon: FolderKanban,
  },
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
          className="group flex h-full gap-3 rounded-md p-3 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-ink [&_svg]:size-4">
            <Icon aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-ink">{item.title}</span>
            <span className="mt-1 block text-sm leading-snug text-muted">
              {item.description}
            </span>
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
        className="flex min-h-10 items-center gap-3 rounded-md px-1 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface focus-visible:bg-surface"
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
  const [isCompact, setIsCompact] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const syncCompactState = () => {
      frame = 0;
      setIsCompact((compact) => compact ? window.scrollY > 8 : window.scrollY >= 24);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(syncCompactState);
    };

    syncCompactState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const desktopCompact = isCompact;

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

  const handleEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !mobileOpen) return;

    closeMobileMenu();
    mobileTriggerRef.current?.focus();
  };

  return (
    <Collapsible open={mobileOpen} onOpenChange={handleMobileOpenChange} asChild>
      <header
        className="sticky top-0 z-40 text-ink lg:h-20"
        onKeyDown={handleEscape}
      >
        <div
          className={cn(
            "mx-auto w-full border-b border-line bg-canvas/95 backdrop-blur transition-[transform,opacity] [transition-duration:240ms] ease-out motion-reduce:duration-0 lg:absolute lg:left-0 lg:right-0 lg:top-0",
            desktopCompact
              ? "lg:h-16 lg:w-[calc(100%_-_3rem)] lg:max-w-6xl lg:translate-y-3 lg:rounded-xl lg:border lg:shadow-soft"
              : "lg:h-20 lg:max-w-none",
          )}
          data-compact={desktopCompact || undefined}
        >
          <nav aria-label="Main navigation">
          <div
            className={cn(
              "mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-6",
            )}
          >
            <Link
              href="/"
              aria-label="UISS home"
              className="flex items-center self-stretch py-2"
            >
              <Image
                src="/brand/uiss-mark.avif"
                alt=""
                width={256}
                height={220}
                priority
                sizes="56px"
                quality={60}
                className={cn(
                  "h-12 w-auto object-contain sm:h-14",
                  desktopCompact && "lg:h-10",
                )}
              />
            </Link>

            <div className="hidden flex-1 justify-center lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Clubs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[44rem] p-3">
                        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                          Technical communities
                        </p>
                        <ul className="grid grid-cols-2 gap-1">
                          {clubItems.map((item) => (
                            <DesktopNavigationCard
                              key={item.href}
                              item={item}
                            />
                          ))}
                        </ul>
                        <Separator className="my-2" />
                        <NavigationMenuLink asChild>
                          <Link
                            href="/clubs"
                            className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none [&_svg]:size-4"
                          >
                            View all clubs
                            <ArrowRight aria-hidden="true" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-96 p-3">
                        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                          Explore UISS
                        </p>
                        <ul className="grid gap-1">
                          {exploreItems.map((item) => (
                            <DesktopNavigationCard
                              key={item.href}
                              item={item}
                            />
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {directItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          className={navigationMenuTriggerStyle()}
                          href={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden lg:block">
              <Button asChild variant="secondary" size="sm">
                <Link href="/membership">Join UISS</Link>
              </Button>
            </div>

            <CollapsibleTrigger asChild>
              <Button
                ref={mobileTriggerRef}
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? (
                  <X aria-hidden="true" />
                ) : (
                  <Menu aria-hidden="true" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent
            id="mobile-navigation"
            forceMount
            className={cn(
              "absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] origin-top overflow-y-auto border-t border-line bg-canvas shadow-soft transition-[transform,opacity] [transition-duration:180ms] ease-out motion-reduce:duration-0 lg:hidden",
              "data-[state=closed]:pointer-events-none data-[state=closed]:scale-[0.97] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
            )}
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 pb-6">
              <Collapsible
                open={mobileClubsOpen}
                onOpenChange={handleMobileClubsChange}
              >
                <CollapsibleTrigger className="group flex min-h-14 w-full items-center justify-between border-b border-line text-left text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 [&_svg]:size-4">
                  Clubs
                  <ChevronDown
                    className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="grid gap-0.5 py-2 sm:grid-cols-2">
                    {clubItems.map((item) => (
                      <MobileNavigationLink
                        key={item.href}
                        item={item}
                        onNavigate={closeMobileMenu}
                      />
                    ))}
                  </ul>
                  <Link
                    href="/clubs"
                    onClick={closeMobileMenu}
                    className="mb-2 flex min-h-10 items-center justify-between rounded-md px-1 text-sm font-semibold text-ink transition-colors hover:bg-surface focus-visible:bg-surface [&_svg]:size-4"
                  >
                    View all clubs
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={mobileExploreOpen}
                onOpenChange={handleMobileExploreChange}
              >
                <CollapsibleTrigger className="group flex min-h-14 w-full items-center justify-between border-b border-line text-left text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 [&_svg]:size-4">
                  Explore
                  <ChevronDown
                    className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="grid gap-0.5 py-2 sm:grid-cols-2">
                    {exploreItems.map((item) => (
                      <MobileNavigationLink
                        key={item.href}
                        item={item}
                        onNavigate={closeMobileMenu}
                      />
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>

              {directItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-14 items-center border-b border-line text-lg font-semibold text-ink transition-colors hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                >
                  {item.title}
                </Link>
              ))}

              <Button asChild variant="secondary" size="lg" className="mt-6">
                <Link href="/membership" onClick={closeMobileMenu}>
                  Join UISS
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
          </nav>
        </div>
      </header>
    </Collapsible>
  );
};

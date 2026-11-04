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
  Shirt,
  type LucideIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
  {
    title: "Merch",
    href: "/merch",
    description: "Wear your UISS pride. Explore the polo collection.",
    icon: Shirt,
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
      <NavigationMenuLink
        render={
          <Link
            href={item.href}
            className="group flex h-full gap-3 rounded-md p-3 text-start transition-colors duration-100 hover:bg-surface focus-visible:bg-surface"
          />
        }
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-panel shadow-border text-ink [&_svg]:size-4">
          <Icon aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-medium text-ink">{item.title}</span>
          <span className="mt-1 block text-sm leading-snug text-muted">{item.description}</span>
        </span>
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

    return () => {
      document.body.style.overflow = previousOverflow;
    };
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
    <Collapsible
      open={mobileOpen}
      onOpenChange={handleMobileOpenChange}
      render={<header className="h-16 text-ink" />}
    >
      <a
        href={pathname.startsWith("/blog/") ? "#article-introduction" : "#main-content"}
        className="uiss-skip-link"
      >
        Skip to content
      </a>
      <div className="fixed inset-x-0 top-0 z-40">
        <div className="w-full bg-panel shadow-[0_1px_0_rgb(0_0_0/0.08)]">
          <nav aria-label="Main navigation" className="uiss-container">
            <div className="relative flex h-16 items-center justify-between gap-8">
              <Link
                href="/"
                aria-label="UISS home"
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md text-xl font-semibold tracking-tight"
              >
                <Image
                  src="/brand/uiss-mark.avif"
                  alt=""
                  width={256}
                  height={220}
                  priority
                  sizes="32px"
                  className="h-8 w-auto object-contain grayscale brightness-0"
                />
                <span aria-hidden="true">UISS</span>
              </Link>

              <div className="hidden flex-1 justify-start lg:flex">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Clubs</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-176 p-3">
                          <p className="px-3 pb-2 text-xs font-medium text-muted">
                            Technical communities
                          </p>
                          <ul className="grid grid-cols-2 gap-1">
                            {clubItems.map((item) => (
                              <DesktopNavigationCard key={item.href} item={item} />
                            ))}
                          </ul>
                          <NavigationMenuLink
                            render={
                              <Link
                                href="/clubs"
                                className="mt-3 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors duration-100 hover:bg-surface focus-visible:bg-surface focus-visible:outline-hidden [&_svg]:size-4"
                              />
                            }
                          >
                            View all clubs <ArrowRight aria-hidden="true" />
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-96 p-3">
                          <p className="px-3 pb-2 text-xs font-medium text-muted">Explore UISS</p>
                          <ul className="grid gap-1">
                            {exploreItems.map((item) => (
                              <DesktopNavigationCard key={item.href} item={item} />
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {directItems.map((item) => (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                          render={
                            <Link
                              className={navigationMenuTriggerStyle()}
                              href={item.href}
                              aria-current={pathname === item.href ? "page" : undefined}
                            />
                          }
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="hidden lg:block">
                <Button
                  render={<Link href="/membership" />}
                  nativeButton={false}
                  variant="default"
                  size="sm"
                >
                  Join UISS
                </Button>
              </div>

              <CollapsibleTrigger
                render={
                  <Button
                    ref={mobileTriggerRef}
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                    aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-controls="mobile-navigation"
                  />
                }
              >
                {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent
              id="mobile-navigation"
              className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain lg:hidden"
            >
              <div className="flex flex-col gap-2 pb-6 pt-3">
                <Collapsible open={mobileClubsOpen} onOpenChange={handleMobileClubsChange}>
                  <CollapsibleTrigger className="group flex min-h-14 w-full items-center justify-between text-start text-base font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 [&_svg]:size-4">
                    Clubs{" "}
                    <ChevronDown
                      className="group-data-[panel-open]:rotate-180"
                      aria-hidden="true"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden">
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
                      className="mb-2 flex min-h-10 items-center justify-between rounded-lg px-1 text-sm font-medium text-ink transition-colors duration-100 hover:bg-surface focus-visible:bg-surface [&_svg]:size-4"
                    >
                      View all clubs <ArrowRight aria-hidden="true" />
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={mobileExploreOpen} onOpenChange={handleMobileExploreChange}>
                  <CollapsibleTrigger className="group flex min-h-14 w-full items-center justify-between text-start text-base font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 [&_svg]:size-4">
                    Explore{" "}
                    <ChevronDown
                      className="group-data-[panel-open]:rotate-180"
                      aria-hidden="true"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden">
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
                    className="flex min-h-14 items-center text-base font-medium text-ink transition-colors duration-100 hover:text-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                  >
                    {item.title}
                  </Link>
                ))}
                <Button
                  render={<Link href="/membership" onClick={closeMobileMenu} />}
                  nativeButton={false}
                  variant="secondary"
                  size="lg"
                  className="mt-5"
                >
                  Join UISS
                </Button>
              </div>
            </CollapsibleContent>
          </nav>
        </div>
      </div>
    </Collapsible>
  );
};

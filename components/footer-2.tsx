import Link from "next/link";
import { Instagram, Linkedin } from "@/components/social-icons";

const copyrightYear = new Date().getFullYear();

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  items: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Clubs", href: "/clubs" },
      { label: "Events", href: "/events" },
      { label: "Projects", href: "/projects" },
      { label: "Merch", href: "/merch" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Society",
    items: [
      { label: "About", href: "/about" },
      { label: "Constitution", href: "/UISSConstitution.pdf" },
      { label: "Membership", href: "/membership" },
      { label: "Contact", href: "mailto:udsmict1@gmail.com" },
    ],
  },
  {
    title: "Contact",
    items: [{ label: "Email UISS", href: "mailto:udsmict1@gmail.com" }],
  },
];

const socialLinks = [
  {
    label: "UISS on Instagram",
    href: "https://www.instagram.com/uiss_udsmict/",
    icon: Instagram,
  },
  {
    label: "UISS on LinkedIn",
    href: "https://www.linkedin.com/company/uiss-udsm-ict-student-s-society/home/",
    icon: Linkedin,
  },
];

function FooterLinkItem({ item }: { item: FooterLink }) {
  const className =
    "text-sm text-muted transition-colors hover:text-ink hover:underline hover:underline-offset-4";

  if (item.external) {
    return (
      <a className={className} href={item.href} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }

  return (
    <Link className={className} href={item.href}>
      {item.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-canvas py-10 text-ink">
      <div className="uiss-container">
        <div className="grid gap-8 pb-8 md:grid-cols-[1.2fr_2fr] md:gap-12">
          <div>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center text-xl font-semibold tracking-tight"
            >
              UISS
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              The ICT Students’ Society at the University of Dar es Salaam.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="flex min-h-10 items-center text-sm font-medium text-ink">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <FooterLinkItem item={item} />
                    </li>
                  ))}
                </ul>
                {group.title === "Contact" ? (
                  <div
                    className="mt-4 flex items-center gap-1"
                    role="group"
                    aria-label="UISS social links"
                  >
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        aria-label={label}
                        className="uiss-button inline-flex size-11 items-center justify-center rounded-control text-muted transition-colors hover:bg-surface hover:text-ink"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon aria-hidden className="size-4" strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {copyrightYear} UISS. All rights reserved.</p>
          <span>University of Dar es Salaam</span>
        </div>
      </div>
    </footer>
  );
}

import type { ITabsHeader } from "../types";

export default function TabHeader({ children, title }: ITabsHeader) {
  return (
    <section className="uiss-admin-page">
      <h1 className="uiss-section-title mb-8">{title}</h1>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

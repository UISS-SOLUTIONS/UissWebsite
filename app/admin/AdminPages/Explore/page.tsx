import Link from "next/link";
import TabHeader from "../../Components/header";
import ExplorePageForm from "../../Components/explorePageForm";
import { Button } from "@/components/ui/button";

export default function Explore() {
  return (
    <TabHeader title="Explore page content">
      <div className="max-w-2xl">
        <ExplorePageForm />
      </div>
      <section className="uiss-admin-panel max-w-2xl p-6">
        <h2 className="text-lg font-semibold">Core values</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Manage the society’s values in the core values section.
        </p>
        <Button
          render={<Link href="/admin/AdminPages/CoreValues" />}
          nativeButton={false}
          variant="outline"
          className="mt-5"
        >
          Manage core values
        </Button>
      </section>
    </TabHeader>
  );
}

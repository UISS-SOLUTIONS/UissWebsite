"use client";

/* oxlint-disable typescript/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Row = {
  id: number;
  memberId: number;
  memberName: string;
  memberLastName: string;
  testimony: string;
  status: string;
  consentRecordedAt: string | null;
  updatedAt: string;
};

export default function TestimonialsAdmin() {
  const [rows, setRows] = useState<Row[]>([]),
    [members, setMembers] = useState<any[]>([]),
    [form, setForm] = useState<any>({
      memberId: "",
      testimony: "",
      consentRecordedAt: "",
      status: "draft",
      id: null,
    });

  const load = () => {
    fetch("/api/testimonials/admin")
      .then((r) => (r.ok ? r.json() : []))
      .then(setRows);
    fetch("/api/users")
      .then((r) => (r.ok ? r.json() : []))
      .then((x) => setMembers(Array.isArray(x) ? x.filter((m: any) => m.status === "active") : []));
  };

  useEffect(load, []);

  const save = async (e: any) => {
    e.preventDefault();
    await fetch("/api/testimonials", {
      method: form.id ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ memberId: "", testimony: "", consentRecordedAt: "", status: "draft", id: null });
    load();
  };

  return (
    <section className="uiss-admin-page">
      <h1 className="uiss-section-title">Testimonials</h1>
      <form onSubmit={save} className="uiss-admin-panel uiss-form-fields mt-8 max-w-2xl p-6">
        <div className="grid min-w-0 gap-2">
          <label htmlFor="testimonial-member" className="text-sm font-medium">
            Member
          </label>
          <select
            id="testimonial-member"
            className="uiss-field"
            required
            value={form.memberId}
            onChange={(e) => setForm({ ...form, memberId: e.target.value })}
          >
            <option value="">Select active member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.firstName} {m.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="testimonial-quote" className="text-sm font-medium">
            Testimonial
          </label>
          <textarea
            id="testimonial-quote"
            required
            maxLength={400}
            value={form.testimony}
            onChange={(e) => setForm({ ...form, testimony: e.target.value })}
            placeholder="Approved member quote"
            className="uiss-field min-h-32"
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="testimonial-consent" className="text-sm font-medium">
            Consent recorded on
          </label>
          <input
            id="testimonial-consent"
            className="uiss-field"
            type="date"
            value={form.consentRecordedAt || ""}
            onChange={(e) => setForm({ ...form, consentRecordedAt: e.target.value })}
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="testimonial-status" className="text-sm font-medium">
            Publication status
          </label>
          <select
            id="testimonial-status"
            className="uiss-field"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="draft">Save draft</option>
            <option value="published">Publish</option>
          </select>
        </div>
        <Button type="submit" size="lg">
          {form.id ? "Update" : "Save"} testimonial
        </Button>
      </form>
      <div className="mt-12 space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted">No testimonials have been added.</p>
        ) : null}
        {rows.map((r) => (
          <article className="uiss-admin-panel p-6" key={r.id}>
            <strong>
              {r.memberName} {r.memberLastName}
            </strong>
            <span className="ms-3 rounded-full bg-surface px-2.5 py-1 text-xs text-muted">
              {r.status}
            </span>
            <p className="mt-2">{r.testimony}</p>
            <small>Updated {new Date(r.updatedAt).toLocaleString()}</small>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setForm({
                    ...r,
                    memberId: String(r.memberId),
                    consentRecordedAt: r.consentRecordedAt?.slice(0, 10) || "",
                  })
                }
              >
                Edit
              </Button>
              {r.status === "published" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={async () => {
                    await fetch("/api/testimonials", {
                      method: "PATCH",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ ...r, status: "draft", memberId: r.memberId }),
                    });
                    load();
                  }}
                >
                  Unpublish
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

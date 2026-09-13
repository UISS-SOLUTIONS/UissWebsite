"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddClub from "../AdminPages/Clubs/components/addClub";
import AddLeaderForm from "./addLeaderForm";
import AddUserForm from "./addUserForm";
import CoreValueForm from "./coreValueForm";
import AddIcon from "./addIcon";
import EditIcon from "./editIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props { title: string; endpoint?: string; action?: boolean; view?: boolean; values: object[]; }
const PAGE_SIZE = 10;
const displayValue = (value: unknown) => value == null ? "—" : typeof value === "object" ? (Array.isArray(value) ? value.join(", ") : "Structured data") : String(value);

export default function TableComponent({ title, action = false, view = false, values = [] }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pathname = usePathname();
  const records = useMemo(() => values as Record<string, unknown>[], [values]);
  const headers = useMemo(() => records[0] ? Object.keys(records[0]) : [], [records]);
  const filtered = useMemo(() => records.filter((item) => headers.some((key) => displayValue(item[key]).toLowerCase().includes(searchQuery.toLowerCase()))), [headers, searchQuery, records]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const hasCreateAction = ["/admin/AdminPages/Users", "/admin/AdminPages/CoreValues", "/admin/AdminPages/Clubs", "/admin/AdminPages/Leaders"].includes(pathname);

  return (
    <section className="uiss-admin-panel overflow-hidden">
      <div className="flex flex-col gap-5 border-b border-line p-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="uiss-eyebrow">Records</p><h1 className="mt-1 font-display text-3xl font-semibold">{title}</h1></div>
        <div className="flex items-end gap-2"><div className="min-w-0 sm:w-64"><label htmlFor={`${title}-search`} className="mb-1.5 block text-sm font-semibold">Search {title.toLowerCase()}</label><Input id={`${title}-search`} type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setPage(1); }} placeholder={`Search ${title.toLowerCase()}…`} /></div>{hasCreateAction && <AddIcon className="uiss-pressable grid size-11 shrink-0 place-items-center rounded-md bg-brand text-brand-ink" aria-label={`Add ${title.toLowerCase()}`}><CreateForm pathname={pathname} /></AddIcon>}</div>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><caption className="sr-only">{title} records</caption><thead className="border-b border-line bg-surface"><tr>{headers.map((header) => <th key={header} scope="col" className="px-5 py-3 font-semibold text-muted">{header.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}</th>)}{(action || view) && <th scope="col" className="px-5 py-3 font-semibold text-muted">Actions</th>}</tr></thead><tbody>{rows.length ? rows.map((data, index) => <tr key={String(data.id ?? `${safePage}-${index}`)} className="border-b border-line last:border-0">{headers.map((header) => <td key={header} className="max-w-xs px-5 py-3"><span className="line-clamp-2">{displayValue(data[header])}</span></td>)}{action && <td className="px-5 py-3"><EditIcon>{pathname === "/admin/AdminPages/CoreValues" && <CoreValueForm data={data} />}</EditIcon></td>}{view && <td className="px-5 py-3"><Button asChild variant="outline" size="sm"><Link href={`/admin/AdminPages/Clubs/${String(data.id)}`}>View</Link></Button></td>}</tr>) : <tr><td colSpan={Math.max(1, headers.length + Number(action || view))} className="px-5 py-14 text-center text-muted">{searchQuery ? "No records match this search." : "No records available."}</td></tr>}</tbody></table></div>
      <footer className="flex flex-col gap-3 border-t border-line px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between"><p className="text-muted">{filtered.length ? `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} of ${filtered.length}` : "0 records"}</p><div className="flex gap-2"><Button type="button" variant="outline" size="sm" disabled={safePage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button><span className="flex min-h-9 items-center px-2 font-semibold">{safePage} / {pageCount}</span><Button type="button" variant="outline" size="sm" disabled={safePage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Next</Button></div></footer>
    </section>
  );
}

function CreateForm({ pathname }: { pathname: string }) {
  if (pathname === "/admin/AdminPages/Users") return <AddUserForm />;
  if (pathname === "/admin/AdminPages/CoreValues") return <CoreValueForm add />;
  if (pathname === "/admin/AdminPages/Clubs") return <AddClub />;
  if (pathname === "/admin/AdminPages/Leaders") return <AddLeaderForm />;
  return null;
}

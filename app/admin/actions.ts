"use server";

import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/requireAdmin";
import { requestAdminApi } from "@/lib/admin-api";

async function adminRequest<Data = unknown>(
  path: string,
  method: "GET" | "POST" | "PATCH",
  values?: Record<string, FormDataEntryValue | null>,
) {
  const denied = await requireAdmin();

  if (denied) throw new Error("Forbidden");

  const cookieStore = await cookies();

  return requestAdminApi<Data>(process.env.NEXT_PUBLIC_API_ROUTE ?? "", path, {
    method,
    headers: { cookie: cookieStore.toString() },
    body: values === undefined ? undefined : JSON.stringify(values),
    checkStatus: ({ ok }) => {
      if (method === "PATCH" && !ok) throw new Error("Failed to update data");
    },
  });
}

export async function submitForm(values: Record<string, FormDataEntryValue | null>, path: string) {
  try {
    const response = await adminRequest(path, "POST", values);

    const data = response.data;

    if (!response.ok) {
      throw new Error("Mhhh!! Failed to submit form");
    }

    return { success: true, message: "Hey Form submitted succesfully!", data };
  } catch (e) {
    throw new Error(
      (e instanceof Error ? e.message : "Unknown error") ||
        "Something went wrong while submitting the form.",
    );
  }
}

export async function fetchData<T = unknown>(path: string): Promise<{ success: boolean; data: T }> {
  try {
    const response = await adminRequest<T>(path, "GET");
    const data = response.data;

    if (!response.ok) {
      return { success: false, data };
    }

    return { success: true, data };
  } catch (e) {
    throw new Error(
      (e instanceof Error ? e.message : "Unknown error") ||
        "Something went wrong when quering data",
    );
  }
}

export async function updateData(values: Record<string, FormDataEntryValue | null>, path: string) {
  try {
    const response = await adminRequest(path, "PATCH", values);

    const data = response.data;

    return { success: true, message: "Data updated successfully", data };
  } catch (e) {
    throw new Error(
      (e instanceof Error ? e.message : "Unknown error") ||
        "Something went wrong while updating the data",
    );
  }
}

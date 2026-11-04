import { z } from "zod";
import { requestJson, type JsonRequestOptions } from "@/lib/services/http";

type AdminRequestOptions = JsonRequestOptions & {
  method: "GET" | "POST" | "PATCH";
};

const paths = {
  GET: z
    .string()
    .regex(
      /^\/(?:clubs(?:\/[1-9]\d*)?|coreValues|leaders|positions|users(?:\/clubUsers\/[1-9]\d*)?|events\/[1-9]\d*)$/,
    ),
  POST: z.string().regex(/^\/(?:clubs|coreValues|heroPage|leaders|events\/[1-9]\d*)$/),
  PATCH: z.string().regex(/^\/(?:clubs|visionMission)\/[1-9]\d*$/),
};

export async function requestAdminApi<Data = unknown>(
  baseUrl: string,
  path: string,
  options: AdminRequestOptions,
) {
  const resource = paths[options.method].parse(path);

  if (resource !== resource.trim()) throw new Error("Invalid admin API path");

  const base = new URL(baseUrl);

  if (
    !["http:", "https:"].includes(base.protocol) ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  ) {
    throw new Error("Invalid admin API configuration");
  }

  const endpoint = `${base.origin}${base.pathname.replace(/\/$/, "")}${resource}`;

  return requestJson<Data>(endpoint, { ...options, cache: "no-store", redirect: "error" });
}

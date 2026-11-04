export type JsonRequestOptions = Omit<RequestInit, "body"> & {
  body?: string;
  checkStatus?: (response: Pick<Response, "ok" | "status">) => void;
};

export type JsonResponse<Data> = {
  ok: boolean;
  status: number;
  data: Data;
};

export async function requestJson<Data = unknown>(
  endpoint: string,
  options: JsonRequestOptions = {},
): Promise<JsonResponse<Data>> {
  const { checkStatus, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers);

  if (requestOptions.body !== undefined && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const response = await fetch(endpoint, { ...requestOptions, headers });
  checkStatus?.({ ok: response.ok, status: response.status });
  const data: Data = await response.json();

  return { ok: response.ok, status: response.status, data };
}

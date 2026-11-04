# Code organization

Actions and routes own the rules for a request. Shared services handle operations that more than one flow needs.

```text
app/
  admin/actions.ts       Admin session checks, API requests and user-facing errors
  membership/actions.ts Validation, rate limits, application writes and notifications
  api/                  Resource validation, authorization and database changes
lib/
  admin-api.ts          Approved admin API paths, methods and destination policy
  services/http.ts      JSON requests, response parsing and HTTP metadata
  services/query.ts     Promise results and explicit failure messages
  format/escape-markup.ts HTML and XML text escaping
  homepage-data.ts      Homepage queries, missing-content flags and logging
  public-data.ts        Public queries, catalog fallbacks and logging
```

`requestJson` accepts a URL and explicit request options. It sets the JSON content type for a serialized body and returns the HTTP status, success flag and parsed response. Actions decide whether an HTTP failure should throw or return a failed result. An optional status check runs before body parsing so update actions retain their existing HTTP error message even when a failed response is not JSON. Callers remain responsible for validating resource fields.

Admin actions check `requireAdmin` before making a request. Callers provide an approved relative resource path, such as `/clubs/7`, rather than a URL. `requestAdminApi` validates the path for the HTTP method and appends it to the server's configured `NEXT_PUBLIC_API_ROUTE`. Requests forward the current session cookies, disable caching and reject redirects. Resource routes still enforce their own authorization and field validation. The API base must be an absolute HTTP or HTTPS URL without credentials, query parameters or a fragment. User creation remains unavailable because `/api/users` has no POST handler.

`settleQuery` accepts an existing query promise and returns either its data or a failure message. It does not import a database, choose fallback content or log errors. Homepage and public-data callers retain those decisions.

`escapeHtml` and `escapeXml` share character escaping while preserving the different apostrophe entities used by membership emails and RSS. Membership notification delivery stays in its action because no other flow uses it.

Extract another service when at least two callers repeat the same operation. Keep authorization, publication policy, validation, state changes and user-facing errors with the action or route that owns them.

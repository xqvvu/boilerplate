# @xqvvu/api

Shared API contract for the boilerplate's oRPC v2 API.

This package is the boundary between the web client and server implementation.
It contains API schemas, procedure contracts, and client types. It must not
contain handlers, database access, Hono types, ORM entities, or server-only
environment values.

## Structure

```text
src/
├─ schemas/       # API DTO schemas and reusable error data
├─ contract/      # oRPC procedure contracts grouped by domain
├─ client.ts      # RouterContractClient type
└─ index.ts       # Public exports and the root contract
```

Keep schemas and contracts grouped by domain. A schema used by one simple
procedure may stay in its contract module; move shared schemas to
`schemas/<domain>.ts`.

## Adding an API

1. Add or reuse the input and output schemas in `src/schemas/<domain>.ts`.
2. Define the procedure with `oc` in `src/contract/<domain>.ts`.
3. Add the domain to `src/contract/index.ts`.
4. Implement the matching procedure in
   `apps/server/src/features/<domain>/router.ts`. The shared `implement(contract)`
   builder lives in `apps/server/src/orpc/os.ts`.

Every procedure contract should declare `.output()`. Declare typed errors with
`.errors()` when callers need to distinguish expected failures. Keep the
contract router keys aligned with the public API namespace and avoid reserved
keys such as `then`, `bind`, `call`, `apply`, and `toJSON`.

Use `import * as z from "zod";` for Zod imports. Keep database models and
internal domain types in the server package rather than exporting them here.

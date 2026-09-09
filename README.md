# Boilerplate

This repository is a Vite+ monorepo with a React web app, a Hono server, and a shared UI package.

## Getting started

```bash
vp install
vp run dev
```

Run the complete local verification suite with:

```bash
vp run ready
```

To work on one package directly:

```bash
vp -C apps/web dev
vp -C apps/server run dev
```

The server development command runs Hono through `tsx watch`; the production flow is:

```bash
vp -C apps/server run build
vp -C apps/server run start
```

## API

The API uses oRPC v2 with a contract in `packages/api`, feature implementations
in `apps/server/src/features`, and a browser client in
`apps/web/src/lib/orpc.ts`.

Run the server and web app in separate terminals during development:

```bash
vp -C apps/server run dev
vp run dev
```

The RPC endpoint uses the `/rpc` prefix. The web Vite server proxies that path to
the Hono server at `http://127.0.0.1:3000`. The server port can be changed with
`PORT`, and the Vite proxy target can be changed with `API_PROXY_TARGET`.

## Server architecture

The server is a feature-first modular monolith. `src/orpc` owns oRPC assembly
and transport concerns; `src/features/<name>` owns one business capability.
The root router only composes feature routers, while each feature's `router.ts`
maps the public contract to application logic.

Keep the initial structure small. Add `service.ts` for a use case with business
rules, and add a repository port plus an infrastructure adapter only when a
feature needs persistence or an external service. Dependencies should point
inward: transport depends on features, application logic depends on ports, and
infrastructure implements those ports. Do not put Hono context, database models,
or server-only values in `packages/api`.

Keep a small feature in one `router.ts`. When a feature grows, use one file per
procedure and keep `router.ts` as the composition entrypoint:

```text
features/users/
├─ router.ts
├─ procedures/
│  ├─ list-users.ts
│  ├─ get-user.ts
│  └─ create-user.ts
└─ application/
   ├─ list-users.ts
   └─ create-user.ts
```

An oRPC handler should adapt input and context, then call an application use
case. Add `domain/` for non-trivial business invariants and add `ports/` plus
infrastructure adapters only when external I/O needs dependency inversion. Do
not split files merely by HTTP method or create empty architecture layers.

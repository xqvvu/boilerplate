# @xqvvu/server

Server-side implementation of the boilerplate API.

## Development

Run the server and web app in separate terminals during development:

```bash
vp -C apps/server run dev
vp run dev
```

The production flow is:

```bash
vp -C apps/server run build
vp -C apps/server run start
```

## API

The API uses oRPC v2 with a contract in `packages/api`, feature implementations
in `src/features`, and a browser client in `../web/src/lib/orpc.ts`.

The server uses the `node:http` adapter and exposes the RPC endpoint under the
`/api` prefix. The server port can be changed with `PORT` and defaults to
`8888`. The web Vite proxy target can be changed with
`SERVER_RPC_BASE_URL`.

The shared contract is maintained in
[`@xqvvu/api`](../../packages/api/README.md).

## Server architecture

The server is a feature-first modular monolith. `src/orpc` owns oRPC assembly
and transport concerns; `src/features/<name>` owns one business capability.
The root router only composes feature routers, while each feature's `router.ts`
maps the public contract to application logic.

Keep the initial structure small. Add `application/` for meaningful use-case
orchestration, `domain/` for non-trivial business invariants, and `ports/` plus
infrastructure adapters only when external I/O needs dependency inversion.
Dependencies should point inward: transport depends on features, application
logic depends on ports, and infrastructure implements those ports. Do not put
Node HTTP context, database models, or server-only values in `packages/api`.

Keep a small feature in one `router.ts`. When a feature grows, use one file per
procedure and keep `router.ts` as the composition entrypoint:

```text
src/features/users/
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
case. Do not split files merely by HTTP method or create empty architecture
layers.

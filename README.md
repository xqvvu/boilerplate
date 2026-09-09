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

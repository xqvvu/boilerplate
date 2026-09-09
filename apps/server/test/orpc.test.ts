import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RPC } from "@xqvvu/api/client";
import { describe, expect, it } from "vite-plus/test";

import { app } from "@/app";

const client: RPC = createORPCClient(
  new RPCLink({
    origin: "http://localhost",
    url: "/rpc",
    fetch: async (url, init) => app.fetch(new Request(url, init)),
  }),
);

describe("oRPC", () => {
  it("serves the health check through Hono", async () => {
    await expect(client.health.check()).resolves.toEqual({ status: "ok" });
  });
});

import { createORPCClient } from "@orpc/client";
import type { JsonifiedClient } from "@orpc/openapi";
import { OpenAPILink } from "@orpc/openapi/fetch";
import { contract } from "@xqvvu/api";
import type { RPCClient } from "@xqvvu/api/client";
import { describe, expect, it } from "vite-plus/test";

import { createApp } from "@/app";

const app = createApp();

const client: JsonifiedClient<RPCClient> = createORPCClient(
  new OpenAPILink(contract, {
    url: "/api",
    fetch: (url, init) => app.handle(new Request(new URL(url, "http://localhost"), init)),
  }),
);

describe("oRPC", () => {
  it("serves the health check through the Elysia app", async () => {
    await expect(client.health.check()).resolves.toEqual({ status: "ok" });
  });
});

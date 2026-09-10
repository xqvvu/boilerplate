import { createORPCClient } from "@orpc/client";
import type { JsonifiedClient } from "@orpc/openapi";
import { OpenAPILink } from "@orpc/openapi/fetch";
import { contract } from "@xqvvu/api";
import type { RPCClient } from "@xqvvu/api/client";
import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

import { createApp } from "@/app";
import { close, listen } from "@/lifecycle";

const server = createApp();
let origin: string;
let client: JsonifiedClient<RPCClient>;

beforeAll(async () => {
  origin = await listen(server, { host: "127.0.0.1", port: 0 });
  client = createORPCClient(
    new OpenAPILink(contract, {
      origin,
      url: "/rpc",
    }),
  );
});

afterAll(async () => {
  await close(server);
});

describe("oRPC", () => {
  it("serves the health check through node:http", async () => {
    await expect(client.health.check()).resolves.toEqual({ status: "ok" });
  });
});

import { createServer } from "node:http";

import { notFound } from "@xqvvu/api/errors";

import { rpcHandler } from "@/orpc/handler";

export function createApp() {
  const app = createServer(async (req, res) => {
    const { matched } = await rpcHandler.handle(req, res, {
      prefix: "/rpc",
      context: {},
    });

    if (!matched) notFound.end(res);
  });

  return app;
}

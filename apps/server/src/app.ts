import { createServer } from "node:http";

import { notFound } from "@/errors/not-found";
import { rpcHandler } from "@/orpc/handler";

export function createApp() {
  const app = createServer(async (req, res) => {
    const { matched } = await rpcHandler.handle(req, res, {
      prefix: "/rpc",
      context: {},
    });

    if (!matched) {
      notFound.end(res);
    }
  });

  return app;
}

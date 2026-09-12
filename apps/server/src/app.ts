import { createServer } from "node:http";

import { notFound } from "@xqvvu/api/errors";

import { handleGenerateOpenAPISpecs, handleRenderScalar } from "@/lib/openapi";
import { rpcHandler } from "@/orpc/handler";

export function createApp() {
  const app = createServer(async (req, res) => {
    const { matched } = await rpcHandler.handle(req, res, {
      prefix: "/api",
      context: {},
    });

    if (req.url === "/specs.json") {
      void handleGenerateOpenAPISpecs(res);
      return;
    }

    if (req.url === "/specs") {
      handleRenderScalar(res);
      return;
    }

    if (!matched) {
      notFound.end(res);
      return;
    }
  });

  return app;
}

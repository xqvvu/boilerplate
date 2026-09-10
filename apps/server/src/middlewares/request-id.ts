import crypto from "node:crypto";

import { os } from "@orpc/server";
import type { ResponseHeadersHandlerPluginContext } from "@orpc/server/plugins";

export function requestId() {
  return os
    .$context<ResponseHeadersHandlerPluginContext>()
    .middleware(async ({ context, next }) => {
      const requestId = crypto.randomUUID();

      context.resHeaders?.set("X-Request-Id", requestId);

      return next({
        context: {
          requestId,
        },
      });
    });
}

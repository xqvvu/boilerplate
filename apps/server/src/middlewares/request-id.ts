import crypto from "node:crypto";

import { os } from "@orpc/server";

export function requestId() {
  return os.middleware(async ({ context, next }) => {
    const requestId = crypto.randomUUID();
    context.resHeaders?.set("X-Request-Id", requestId);
    return next({
      context: {
        requestId,
      },
    });
  });
}

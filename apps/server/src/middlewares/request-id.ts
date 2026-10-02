import crypto from "node:crypto";

import type { ResponseHeadersHandlerPluginContext } from "@orpc/server/plugins";

declare module "@orpc/server" {
  export interface DefaultInitialContext extends ResponseHeadersHandlerPluginContext {
    requestId: string;
  }
}

export const REQUEST_ID_HEADER_NAME = "X-Request-Id" as const;
const SAFE_REQUEST_ID_PATTERN = /^[\w.:-]{1,200}$/;

export function requestId(request: Request) {
  const im = request.headers.get(REQUEST_ID_HEADER_NAME);
  if (im && SAFE_REQUEST_ID_PATTERN.test(im)) {
    return im;
  }
  return crypto.randomUUID();
}

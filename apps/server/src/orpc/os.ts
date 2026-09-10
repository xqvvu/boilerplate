import { implement } from "@orpc/server";
import type { ResponseHeadersHandlerPluginContext } from "@orpc/server/plugins";
import { contract } from "@xqvvu/api";

import { requestId } from "@/middlewares/request-id";

export const os = implement(contract)
  .$context<ResponseHeadersHandlerPluginContext>()
  .use(requestId());

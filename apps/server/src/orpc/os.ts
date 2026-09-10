import { implement } from "@orpc/server";
import { os as __os } from "@orpc/server";
import type { ResponseHeadersHandlerPluginContext } from "@orpc/server/plugins";
import { contract } from "@xqvvu/api";

import { requestId } from "@/middlewares/request-id";

export type $Context = ResponseHeadersHandlerPluginContext;

export const $os = __os.$context<$Context>();

export const os = implement(contract).$context<$Context>().use(requestId());

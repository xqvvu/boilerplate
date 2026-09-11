import { implement } from "@orpc/server";
import { contract } from "@xqvvu/api";

import { requestId } from "@/middlewares/request-id";

export const os = implement(contract).use(requestId());

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { RPCClient } from "@xqvvu/api/client";

import { env } from "@/env";

const link = new RPCLink({
  origin: import.meta.env.DEV ? undefined : env.VITE_API_ORIGIN,
  url: "/api",
});

export const rpcClient: RPCClient = createORPCClient(link);

export const queryClient = createTanstackQueryUtils(rpcClient);

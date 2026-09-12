import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { RPCClient } from "@xqvvu/api/client";

const link = new RPCLink({
  url: "/api",
});

export const rpcClient: RPCClient = createORPCClient(link);

export const queryClient = createTanstackQueryUtils(rpcClient);

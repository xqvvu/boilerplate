import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RPCClient } from "@xqvvu/api/client";

const link = new RPCLink({
  url: "/rpc",
});

export const rpc: RPCClient = createORPCClient(link);

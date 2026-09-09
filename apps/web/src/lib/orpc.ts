import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RPC } from "@xqvvu/api/client";

const link = new RPCLink({
  url: "/rpc",
});

export const rpc: RPC = createORPCClient(link);

import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { RPC_DEFAULT_ALLOW_METHODS } from "@orpc/server/standard";

import { router } from "@/orpc/router";

export const rpcHandler = new RPCHandler(router, {
  allowMethods: RPC_DEFAULT_ALLOW_METHODS,
  interceptors: [
    onError((error) => {
      console.error("oRPC request failed", error);
    }),
  ],
});

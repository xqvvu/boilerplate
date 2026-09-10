import { OpenAPIHandler } from "@orpc/openapi/node";
import { onError } from "@orpc/server";
import { CORSHandlerPlugin } from "@orpc/server/plugins";

import { router } from "@/orpc/router";

export const rpcHandler = new OpenAPIHandler(router, {
  plugins: [new CORSHandlerPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

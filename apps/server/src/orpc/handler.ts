import { OpenAPIHandler } from "@orpc/openapi/node";
import { onError } from "@orpc/server";
import { CORSHandlerPlugin, ResponseHeadersHandlerPlugin } from "@orpc/server/plugins";

import { router } from "@/orpc/router";

export const rpcHandler = new OpenAPIHandler(router, {
  plugins: [new CORSHandlerPlugin(), new ResponseHeadersHandlerPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

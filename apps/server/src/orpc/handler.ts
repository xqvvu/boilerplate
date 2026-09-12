import { OpenAPIHandler } from "@orpc/openapi/node";
import { onError } from "@orpc/server";
import {
  CORSHandlerPlugin,
  ResponseCompressionHandlerPlugin,
  ResponseHeadersHandlerPlugin,
} from "@orpc/server/plugins";

import { router } from "@/orpc/router";

export const rpcHandler = new OpenAPIHandler(router, {
  plugins: [
    new CORSHandlerPlugin({
      allowHeaders: ["Content-Disposition", "Standard-Server"],
      exposeHeaders: ["Content-Disposition", "Standard-Server"],
    }),
    new ResponseHeadersHandlerPlugin(),
    new ResponseCompressionHandlerPlugin(),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

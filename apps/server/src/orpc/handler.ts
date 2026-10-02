import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import {
  CORSHandlerPlugin,
  ResponseCompressionHandlerPlugin,
  ResponseHeadersHandlerPlugin,
} from "@orpc/server/plugins";

import { ALLOW_HEADERS, EXPOSE_HEADERS } from "@/lib/constants";
import { router } from "@/orpc/router";

export const rpcHandler = new OpenAPIHandler(router, {
  plugins: [
    new CORSHandlerPlugin({
      allowHeaders: ALLOW_HEADERS,
      exposeHeaders: EXPOSE_HEADERS,
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

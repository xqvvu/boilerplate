import { node } from "@elysia/node";
import { Elysia } from "elysia";

import { requestId, REQUEST_ID_HEADER_NAME } from "@/middlewares/request-id";
import { rpcHandler } from "@/orpc/handler";

export function createApp() {
  const app = new Elysia({
    adapter: node(),
  });

  app
    .onRequest(({ request, set }) => {
      set.headers[REQUEST_ID_HEADER_NAME] = requestId(request);
    })
    .derive(({ set }) => {
      const requestId = set.headers[REQUEST_ID_HEADER_NAME] as string;
      return {
        requestId,
      };
    })
    .all(
      "/api/*",
      async ({ request, requestId }) => {
        const { response } = await rpcHandler.handle(request, {
          prefix: "/api",
          context: {
            requestId,
          },
        });

        return response;
      },
      {
        parse: "none",
      },
    );

  return app;
}

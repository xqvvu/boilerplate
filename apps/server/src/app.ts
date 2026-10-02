import { node } from "@elysia/node";
import { Elysia } from "elysia";

import { createSpecsRoute } from "@/lib/openapi";
import { requestId, REQUEST_ID_HEADER_NAME } from "@/middlewares/request-id";
import { rpcHandler } from "@/orpc/handler";

export function createApp() {
  const app = new Elysia({ adapter: node() });
  app
    .onRequest(({ request, set }) => {
      set.headers[REQUEST_ID_HEADER_NAME] = requestId(request);
    })
    .derive(({ set }) => {
      return {
        requestId: set.headers[REQUEST_ID_HEADER_NAME] as string,
      };
    })
    .all(
      "/api/*",
      async ({ request, requestId, set }) => {
        const { matched, response } = await rpcHandler.handle(request, {
          prefix: "/api",
          context: {
            requestId,
          },
        });

        if (!matched) {
          set.status = 404;
          return { code: "NOT_FOUND", message: "the route not found" };
        }

        return response;
      },
      { parse: "none" },
    );

  app.use(createSpecsRoute());

  return app;
}

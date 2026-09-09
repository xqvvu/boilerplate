import { Hono } from "hono";

import { requestId } from "@/middlewares/request-id";
import { rpcHandler } from "@/orpc/handler";

export const app = new Hono<Env>();

app.use("*", requestId());

app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await rpcHandler.handle(c.req.raw, {
    prefix: "/rpc",
    context: {
      headers: c.req.raw.headers,
      requestId: c.var.requestId,
    },
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

app.notFound((c) => {
  return c.json({ message: "Not found" }, 404);
});

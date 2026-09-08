import { Hono } from "hono";

import { requestId } from "@/middlewares/request-id";

export const app = new Hono<Env>();

app.use("*", requestId());

app.notFound((c) => {
  return c.json({ message: "Not found" }, 404);
});

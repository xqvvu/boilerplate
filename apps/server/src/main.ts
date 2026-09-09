import { serve } from "@hono/node-server";

import { app } from "@/app";

async function main() {
  const port = Number(process.env["PORT"] ?? 3000);
  const _listener = serve({
    fetch: app.fetch,
    port,
  });
}

void main();

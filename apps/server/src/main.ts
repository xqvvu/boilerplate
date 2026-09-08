import { serve } from "@hono/node-server";

import { app } from "@/app";

async function main() {
  const _listener = serve({
    fetch: app.fetch,
  });
}

void main();

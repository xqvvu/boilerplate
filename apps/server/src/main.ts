import { createApp } from "@/app";
import { env } from "@/env";

async function main() {
  const app = createApp();

  app.listen(env.PORT);
}

void main();

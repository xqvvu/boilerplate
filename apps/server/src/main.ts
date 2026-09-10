import { createApp } from "@/app";
import { env } from "@/env";
import { close, listen } from "@/lifecycle";

async function main() {
  const app = createApp();

  const addr = await listen(app, { port: env.PORT });
  console.info(addr);

  let isShutdown = false;
  const shutdown = async () => {
    if (!isShutdown) {
      isShutdown = true;
      try {
        await close(app);
      } catch (error) {
        console.error("failed to close HTTP server", error);
        process.exitCode = 1;
      }
    }
  };

  process.once("SIGTERM", () => void shutdown());
  process.once("SIGINT", () => void shutdown());
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

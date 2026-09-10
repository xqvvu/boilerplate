import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["production", "development", "test"]),

    PORT: z.coerce.number<number>().int().positive().min(1025).max(65535).default(8888),
  },
  isServer: true,
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

import { healthRouter } from "@/features/health/router";
import { os } from "@/orpc/os";

export const router = os.router({
  health: healthRouter,
});

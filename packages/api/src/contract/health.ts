import { oc } from "@orpc/contract";
import { openapi } from "@orpc/openapi";

import { HealthCheckOutputSchema } from "../schemas/health";

export const health = {
  check: oc.meta(openapi({ method: "GET" })).output(HealthCheckOutputSchema),
};

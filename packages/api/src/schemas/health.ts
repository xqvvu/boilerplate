import * as z from "zod";

export const HealthCheckOutputSchema = z.object({
  status: z.literal("ok"),
});

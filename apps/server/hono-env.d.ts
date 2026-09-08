import { RequestIdVariables } from "hono/request-id";

declare global {
  interface Env {
    Variables: RequestIdVariables;
  }
}

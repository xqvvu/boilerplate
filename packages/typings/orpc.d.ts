import type { ResponseHeadersHandlerPluginContext } from "@orpc/server/plugins";

type Context = ResponseHeadersHandlerPluginContext;

declare module "@orpc/server" {
  export interface DefaultInitialContext extends Context {}

  // interface Registry {
  //   ORPCErrorCode: "NOT_FOUND" | "UNAUTHORIZED";
  // }
}

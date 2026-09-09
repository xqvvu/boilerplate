import { implement } from "@orpc/server";
import { contract } from "@xqvvu/api";

// Keep one implementer so every feature shares the same contract and context.
export const os = implement(contract).$context<{
  headers: Headers;
  requestId: string;
}>();

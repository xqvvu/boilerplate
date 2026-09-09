import type { RouterContractClient } from "@orpc/contract";

import type { contract } from "./contract";

export type RPC = RouterContractClient<typeof contract>;

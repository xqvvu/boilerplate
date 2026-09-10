import type { ServerResponse as NodeServerResponse, IncomingMessage } from "node:http";

declare global {
  type ServerResponse = NodeServerResponse<IncomingMessage> & { req: IncomingMessage };
  type ServerRequest = IncomingMessage;
}

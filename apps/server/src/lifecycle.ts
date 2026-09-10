import type { Server } from "node:http";
import type { AddressInfo } from "node:net";

export async function listen(
  server: Server,
  options: {
    host?: string;
    port: number;
  },
): Promise<string> {
  await new Promise<void>((resolve, reject) => {
    const onError = (error: Error) => {
      server.off("listening", onListening);
      reject(error);
    };
    const onListening = () => {
      server.off("error", onError);
      resolve();
    };

    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(options);
  });

  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("server did not bind to a TCP address");
  }

  const host = address.address.includes(":") ? `[${address.address}]` : address.address;
  return `http://${host}:${(address as AddressInfo).port}`;
}

export async function close(server: Server): Promise<void> {
  if (server.listening) {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

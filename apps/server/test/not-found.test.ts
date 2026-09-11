import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

import { createApp } from "@/app";
import { close, listen } from "@/lifecycle";

const server = createApp();
let origin: string;

beforeAll(async () => {
  origin = await listen(server, { host: "127.0.0.1", port: 0 });
});

afterAll(async () => {
  await close(server);
});

describe("not found", () => {
  it("responds with a 404 JSON response", async () => {
    const response = await fetch(`${origin}/not-found`);

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({
      code: "NOT_FOUND",
      message: expect.any(String),
    });
  });
});

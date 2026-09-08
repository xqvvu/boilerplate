import { describe, expect, it } from "vite-plus/test";

import { app } from "@/app";

describe("not found", () => {
  it("responds with a 404 JSON response", async () => {
    const response = await app.request("/not-found");

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");

    const data = await response.json();
    expect(data).toEqual({ message: "Not found" });
  });
});

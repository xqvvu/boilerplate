import { node } from "@elysia/node";
import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import packageJson from "@package-json";
import { Elysia } from "elysia";

import { router } from "@/orpc/router";

export const openAPIGenerator = new OpenAPIGenerator({
  converters: [new ZodToJsonSchemaConverter()],
});

export async function generateOpenAPISpec() {
  return openAPIGenerator.generate(router, {
    base: {
      info: {
        title: "Boilerplate",
        version: packageJson.version,
      },
      servers: [{ url: "/api" }],
      security: [{ bearerAuth: [] }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    },
  });
}

export function renderScalarReference() {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Boilerplate</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="https://orpc.dev/icon.svg" />
      </head>
      <body>
        <div id="app"></div>

        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        <script>
          Scalar.createApiReference('#app', {
            url: '/specs.json',
            metaData: {
              title: 'Boilerplate API Reference',
              description: 'Interactive reference for the Boilerplate HTTP API.',
            },
            defaultHttpClient: { targetKey: 'shell', clientKey: 'curl' },
            persistAuth: true,
            telemetry: false,
            agent: { disabled: true },
            mcp: { disabled: true },
            authentication: {
              securitySchemes: {
                bearerAuth: {
                  token: 'default-token',
                },
              },
            },
          });
        </script>
      </body>
    </html>
  `;
}

export function createSpecsRoute() {
  const specs = new Elysia({ adapter: node() });
  specs
    .get("/specs.json", async () => {
      return new Response(JSON.stringify(await generateOpenAPISpec()), {
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      });
    })
    .get("/specs", () => {
      return new Response(renderScalarReference(), {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      });
    });

  return specs;
}

import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import packageJson from "@packageJson";

import { router } from "@/orpc/router";

export const openAPIGenerator = new OpenAPIGenerator({
  converters: [new ZodToJsonSchemaConverter()],
});

export async function handleGenerateOpenAPISpecs(res: ServerResponse) {
  const spec = await openAPIGenerator.generate(router, {
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

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(spec));
  return;
}

export function handleRenderScalar(res: ServerResponse) {
  const scalar = "https://esm.sh/@scalar/api-reference@1.68.0";

  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Boilerplate</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="https://orpc.dev/icon.svg" />
        <link rel="stylesheet" href="${scalar}/dist/style.css" />
      </head>
      <body>
        <div id="app">Loading the API reference...</div>

        <script type="module">
          import { createApiReference } from "${scalar}";

          createApiReference('#app', {
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

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
  return;
}

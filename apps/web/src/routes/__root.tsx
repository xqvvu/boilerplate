import { Outlet, createRootRoute } from "@tanstack/react-router";
import { UI } from "@xqvvu/ui";

import TanStackDevtools from "@/misc/tanstack-devtools.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <UI>
      <Outlet />

      <TanStackDevtools />
    </UI>
  );
}

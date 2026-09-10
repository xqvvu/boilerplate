import { Outlet, createRootRoute } from "@tanstack/react-router";
import { UIProvider } from "@xqvvu/ui";

import TanStackDevtools from "@/misc/tanstack-devtools.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <UIProvider>
      <Outlet />

      <TanStackDevtools />
    </UIProvider>
  );
}

import { Outlet, createRootRoute } from "@tanstack/react-router";
import { UIProvider } from "@xqvvu/ui";

import TanStackDevtools from "@/misc/tanstack-devtools";
import TanStackQueryProvider from "@/misc/tanstack-query";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <UIProvider>
      <TanStackQueryProvider>
        <Outlet />
      </TanStackQueryProvider>

      <TanStackDevtools />
    </UIProvider>
  );
}

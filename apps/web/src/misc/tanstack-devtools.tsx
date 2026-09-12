import { TanStackDevtools as __TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export function TanStackDevtools() {
  return (
    <__TanStackDevtools
      config={{
        position: "bottom-right",
      }}
      plugins={[
        {
          name: "Router",
          render: <TanStackRouterDevtoolsPanel />,
        },
      ]}
    />
  );
}

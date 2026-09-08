import { createFileRoute } from "@tanstack/react-router";
import { Heading, Page, Text } from "@xqvvu/ui";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Page>
      <Heading>Welcome to TanStack Start</Heading>
      <Text>
        Edit <code>src/routes/index.tsx</code> to get started.
      </Text>
    </Page>
  );
}

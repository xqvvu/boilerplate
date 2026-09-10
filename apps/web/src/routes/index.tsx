import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Heading, HStack, Text, VStack } from "@xqvvu/ui";

import { HealthPanel } from "#/routes/-components/health-panel.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell height="auto" variant="surface" contentPadding={4}>
      <HStack justify="center" width="100%">
        <VStack as="section" gap={8} width="100%" maxWidth={640}>
          <VStack as="header" gap={1}>
            <Text type="label" color="accent" weight="bold">
              Boilerplate API
            </Text>
            <Heading level={1} type="display-2">
              Health check
            </Heading>
            <Text type="large" color="secondary">
              Service status and connectivity
            </Text>
          </VStack>

          <HealthPanel />
        </VStack>
      </HStack>
    </AppShell>
  );
}

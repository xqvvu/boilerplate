import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Button, Card, Grid, Heading, HStack, StatusDot, Text, VStack } from "@xqvvu/ui";
import { useCallback, useEffect, useState } from "react";

import { rpc } from "@/lib/orpc";

export const Route = createFileRoute("/")({ component: Home });

type HealthState =
  | { status: "checking" }
  | { status: "healthy"; checkedAt: Date; responseStatus: "ok" }
  | { status: "unavailable"; checkedAt: Date; message: string };

type HealthResult = Exclude<HealthState, { status: "checking" }>;

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

function HealthPanel() {
  const [state, setState] = useState<HealthState>({ status: "checking" });

  const requestHealth = useCallback(async (): Promise<HealthResult> => {
    try {
      const response = await rpc.health.check();
      return {
        status: "healthy",
        checkedAt: new Date(),
        responseStatus: response.status,
      };
    } catch (error) {
      return {
        status: "unavailable",
        checkedAt: new Date(),
        message: error instanceof Error ? error.message : "The API could not be reached.",
      };
    }
  }, []);

  const checkHealth = useCallback(async () => {
    setState({ status: "checking" });
    setState(await requestHealth());
  }, [requestHealth]);

  useEffect(() => {
    let disposed = false;

    void requestHealth().then((result) => {
      if (!disposed) {
        setState(result);
      }
    });

    return () => {
      disposed = true;
    };
  }, [requestHealth]);

  const isChecking = state.status === "checking";
  const isHealthy = state.status === "healthy";
  const statusLabel = isChecking ? "Checking" : isHealthy ? "Healthy" : "Error";
  const statusVariant = isChecking ? "warning" : isHealthy ? "success" : "error";

  return (
    <Card
      role="region"
      aria-labelledby="health-status-title"
      padding={6}
      elevation="low"
      width="100%"
    >
      <VStack gap={5}>
        <HStack justify="between" align="start" wrap="wrap" gap={3}>
          <VStack gap={1}>
            <Text type="label" color="secondary">
              API status
            </Text>
            <Heading level={2} id="health-status-title">
              {isChecking ? "Checking service" : isHealthy ? "Operational" : "Unavailable"}
            </Heading>
          </VStack>
          <HStack align="center" gap={2} aria-live="polite">
            <StatusDot variant={statusVariant} label={statusLabel} />
            <Text type="label">{statusLabel}</Text>
          </HStack>
        </HStack>

        <Grid columns={{ minWidth: 160, max: 3 }} gap={4} aria-live="polite">
          <VStack gap={1}>
            <Text type="label" color="secondary">
              Endpoint
            </Text>
            <Text type="code">POST /rpc/health/check</Text>
          </VStack>
          <VStack gap={1}>
            <Text type="label" color="secondary">
              Response
            </Text>
            <Text type="code" color="secondary">
              {isChecking
                ? "Waiting for response"
                : isHealthy
                  ? `status: ${state.responseStatus}`
                  : state.message}
            </Text>
          </VStack>
          {state.status !== "checking" && (
            <VStack gap={1}>
              <Text type="label" color="secondary">
                Last checked
              </Text>
              <Text type="code">{state.checkedAt.toLocaleTimeString()}</Text>
            </VStack>
          )}
        </Grid>

        <HStack justify="end">
          <Button
            label={isChecking ? "Checking..." : "Run check"}
            variant="primary"
            isLoading={isChecking}
            onClick={() => void checkHealth()}
          />
        </HStack>
      </VStack>
    </Card>
  );
}

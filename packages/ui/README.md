# @xqvvu/ui

The shared UI contract for the boilerplate. It is built on Astryx: Astryx
provides accessible behavior and themed components; this package provides the
default theme, the public component taxonomy, and the composition rules used by
the apps in this repository.

## Setup

Wrap the application once with `UIProvider`:

```tsx
import { UIProvider } from "@xqvvu/ui";

<UIProvider>
  <App />
</UIProvider>;
```

`UI` remains available as a compatibility alias. The default theme is
`boilerplateTheme`; pass another Astryx `DefinedTheme` when an app needs a
different visual surface.

## Component taxonomy

Use the root import for convenience or a category subpath when the boundary is
useful in a larger feature:

| Category | Responsibility | Examples |
| --- | --- | --- |
| `layout` | Page regions and spacing | `Layout`, `Section`, `Card`, `VStack`, `Grid` |
| `navigation` | App frame and route navigation | `AppShell`, `TopNav`, `SideNav`, `TabList` |
| `typography` | Semantic content hierarchy | `Heading`, `Text`, `Code`, `Markdown` |
| `actions` | User commands and control groups | `Button`, `IconButton`, `ToggleButton` |
| `data-display` | Collections, status, and metadata | `List`, `Table`, `Badge`, `StatusDot` |
| `forms` | Controlled input and selection | `Field`, `TextInput`, `Selector`, `Switch` |
| `feedback` | Loading, messages, and overlays | `Banner`, `EmptyState`, `Dialog`, `Toast` |

## Composition rules

1. Start with `AppShell`. Use `Layout` only for named header, panel, content,
   or footer regions inside that shell.
2. Use `Section` for page-level groups. Use `Card` only for a self-contained
   widget or a hard boundary around important content.
3. Render records as `List`/`Item` or `Table`; do not wrap every record in a
   `Card`.
4. Use `Heading` for document hierarchy and `Text` with a semantic `type` for
   body, label, supporting, large, or code text.
5. Use Astryx props first. When custom styling is required, use StyleX with
   token exports from `@xqvvu/ui/astryx.stylex` and pass the result through
   `xstyle`.

```tsx
import { AppShell, Heading, Section, Text, VStack } from "@xqvvu/ui";

function SettingsPage() {
  return (
    <AppShell contentPadding={4} height="auto" variant="surface">
      <VStack as="section" gap={6} maxWidth={640}>
        <VStack as="header" gap={1}>
          <Heading level={1}>Settings</Heading>
          <Text type="supporting">Manage the defaults for this workspace.</Text>
        </VStack>
        <Section>
          <VStack gap={4}>{/* fields */}</VStack>
        </Section>
      </VStack>
    </AppShell>
  );
}
```

The full implementation guidance lives in the Astryx CLI:
`pnpm exec astryx docs layout`, `pnpm exec astryx docs tokens`, and
`pnpm exec astryx docs styling`.

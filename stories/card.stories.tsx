import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "../src/components/badge"
import { Button } from "../src/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRow,
  CardTitle,
  SectionLabel,
} from "../src/components/card"
import { ActionTile } from "../src/components/action-tile"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../src/components/collapsible"
import { Container } from "../src/components/container"
import { Input } from "../src/components/input"
import { PageHeader } from "../src/components/page-header"
import { Separator } from "../src/components/separator"
import { Popover, PopoverContent, PopoverTrigger } from "../src/components/popover"
import { Stat, StatGroup } from "../src/components/stat"
import {
  SummaryCard,
  SummaryCardActions,
  SummaryCardAside,
  SummaryCardCount,
  SummaryCardFact,
  SummaryCardFacts,
  SummaryCardMain,
  SummaryCardSince,
  SummaryCardStatus,
  SummaryCardWord,
} from "../src/components/summary-card"
import { Switch } from "../src/components/switch"
import CaretDownIcon from "~icons/ph/caret-down"
import CubeIcon from "~icons/ph/cube"
import FileTextIcon from "~icons/ph/file-text"
import TerminalWindowIcon from "~icons/ph/terminal-window"
import CodeIcon from "~icons/ph/code"

const meta = {
  title: "Components/Layout",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Cards: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Domains</CardTitle>
          <CardDescription>Where people reach this service.</CardDescription>
          <CardAction>
            <Button size="sm" variant="secondary">
              Add domain
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>app.zeabur.app</CardContent>
        <CardFooter>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>
      <div>
        <SectionLabel>Time & region</SectionLabel>
        <Card variant="list">
          <CardRow label="Region" description="Where the service runs.">
            <Badge variant="secondary">Tokyo</Badge>
          </CardRow>
          <CardRow label="Sleep when idle" description="Stop after ten minutes without traffic.">
            <Switch defaultChecked aria-label="Sleep when idle" />
          </CardRow>
          <CardRow label="Name">
            <Input defaultValue="web" className="w-48" />
          </CardRow>
          <CardRow label="Namespace" description="The longest name Kubernetes allows.">
            <span className="type-mono" translate="no">
              team-payments-production-eu-west-1-canary-rollout-2026-10-ab12x
            </span>
          </CardRow>
        </Card>
      </div>
      <Card variant="list">
        <Collapsible>
          <CollapsibleTrigger variant="row">
            <span className="flex-1">Advanced</span>
            <CaretDownIcon aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t border-v2-border px-5 py-4 text-secondary">
              Health checks, start command, resources.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  ),
}

export const Containers: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <Container title="CPU" titleAction={<Badge variant="ok">Healthy</Badge>}>
        <p className="type-figure">0.42 vCPU</p>
      </Container>
      <Container title="Memory">
        <p className="type-figure">512 MiB</p>
      </Container>
      <Container title="Domains" variant="list">
        <a href="#app" className="px-4 py-3 text-sm font-medium hover:bg-v2-surface-hover">
          app.example.com
        </a>
        <a href="#www" className="px-4 py-3 text-sm font-medium hover:bg-v2-surface-hover">
          www.example.com
        </a>
      </Container>
    </div>
  ),
}

export const Page: Story = {
  render: () => (
    <div className="flex max-w-4xl flex-col gap-6">
      <PageHeader
        title="Projects"
        description="Everything you deploy lives in a project."
        actions={<Button>New project</Button>}
      />
      <Separator />
      <PageHeader
        size="name"
        title={<span translate="no">my-service</span>}
        badges={<Badge variant="ok">Running</Badge>}
        actions={<Button variant="secondary">Redeploy</Button>}
      />
      <StatGroup>
        <Stat label="Services" value="12" hint="3 sleeping" />
        <Stat label="Failing" value="1" tone="fail" />
        <Stat label="This month" value="$4.20" hint="of $5.00" />
      </StatGroup>
    </div>
  ),
}

export const Summary: Story = {
  render: () => (
    <div className="flex max-w-4xl flex-col gap-4">
      <SummaryCard aria-label="Status">
        <SummaryCardMain>
          <SummaryCardStatus tone="ok">
            <SummaryCardWord>Running</SummaryCardWord>
            <Popover>
              <PopoverTrigger render={<SummaryCardCount />}>
                1/1
                <CaretDownIcon aria-hidden="true" />
              </PopoverTrigger>
              <PopoverContent>
                <p className="p-2 type-meta">web-7c9d8-fghij · Ready</p>
              </PopoverContent>
            </Popover>
          </SummaryCardStatus>
          <SummaryCardSince>12 days ago</SummaryCardSince>
          <SummaryCardFacts>
            <SummaryCardFact label="Source">
              <CubeIcon aria-hidden="true" />
              <span className="truncate type-mono">ghcr.io/example/web:2.4.1</span>
            </SummaryCardFact>
            <SummaryCardFact label="Server">k3d-demo</SummaryCardFact>
          </SummaryCardFacts>
          <SummaryCardActions>
            <Button variant="secondary" size="sm">
              Restart
            </Button>
          </SummaryCardActions>
        </SummaryCardMain>
        <SummaryCardAside>
          <Stat label="CPU" value="0.12 vCPU" hint="of 1 vCPU" />
        </SummaryCardAside>
      </SummaryCard>
      <Container title="Connect" variant="list">
        <dl className="flex flex-col divide-y divide-main text-xs">
          {[
            ["Host", "web.demo.svc"],
            ["Port", "8080"],
            ["Connection string", "http://web.demo.svc:8080"],
          ].map(([label, value]) => (
            <div key={label} className="flex min-w-0 items-center gap-x-4 px-4 py-2.5">
              <dt className="w-fact-label shrink-0 font-medium text-tertiary">{label}</dt>
              <dd className="min-w-0 truncate type-mono text-main">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ActionTile>
          <FileTextIcon aria-hidden="true" />
          Logs
        </ActionTile>
        <ActionTile>
          <TerminalWindowIcon aria-hidden="true" />
          Terminal
        </ActionTile>
        <ActionTile disabled>
          <CodeIcon aria-hidden="true" />
          YAML
        </ActionTile>
      </div>
    </div>
  ),
}

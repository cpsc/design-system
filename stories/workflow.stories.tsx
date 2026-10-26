import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Avatar } from "../src/components/avatar"
import { Button } from "../src/components/button"
import { ContextChip } from "../src/components/context-chip"
import { DraftBar } from "../src/components/draft-bar"
import { SectionNav } from "../src/components/section-nav"
import { Timeline, TimelineItem } from "../src/components/timeline"

const meta = {
  title: "Components/Workflow",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ContextChips: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-3">
      <ContextChip
        avatar={<Avatar size="xs" name="prod" />}
        place="prod-tokyo"
        identity="ada@example.com"
      />
      <ContextChip
        avatar={<Avatar size="xs" name="prod" />}
        place="prod-tokyo"
        identity="ada@example.com"
        elevated="Admin until 14:20"
      />
      <ContextChip
        avatar={<Avatar size="xs" name="ada" />}
        place="a-very-long-cluster-context-name-that-truncates"
        identity="ada.lovelace.with.a.long.address@example.com"
        elevated="Admin until 14:20"
      />
      <ContextChip place="kind-local" identity="system:serviceaccount" />
    </div>
  ),
}

const sections = [
  { id: "variables", label: "Variables", trailing: "12" },
  { id: "networking", label: "Domains and addresses" },
  { id: "storage", label: "Storage", trailing: "1" },
  { id: "compute", label: "Compute" },
  { id: "health", label: "Health checks", trailing: "•" },
]

function Sections() {
  const [current, setCurrent] = useState("variables")
  return (
    <div className="flex flex-col gap-6">
      <SectionNav
        aria-label="Sections"
        className="w-56"
        items={sections}
        current={current}
        onSelect={(id, event) => {
          event.preventDefault()
          setCurrent(id)
        }}
      />
    </div>
  )
}

export const SectionNavs: Story = { render: () => <Sections /> }

export const DraftBars: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <DraftBar
        label="3 changes pending"
        detail="Variables, Compute"
        actions={
          <>
            <Button variant="ghost" size="sm">
              Discard
            </Button>
            <Button size="sm">Review</Button>
          </>
        }
      />
      <DraftBar
        label="1 change pending"
        blocked="Memory limit is below its request."
        actions={
          <>
            <Button variant="ghost" size="sm">
              Discard
            </Button>
            <Button size="sm" disabled>
              Review
            </Button>
          </>
        }
      />
    </div>
  ),
}

export const Timelines: Story = {
  render: () => (
    <Timeline className="max-w-xl">
      <TimelineItem
        tone="progress"
        title="Rolling out release 14"
        time="2 min ago"
        meta="ada@example.com"
      >
        2 of 3 replicas on the new release.
      </TimelineItem>
      <TimelineItem
        tone="fail"
        title="Back-off restarting failed container"
        time="10 min ago"
        actions={
          <Button variant="outline" size="xs">
            Logs
          </Button>
        }
      />
      <TimelineItem
        tone="ok"
        title="Release 13"
        time="Yesterday"
        meta="Image ghcr.io/acme/api:1.4.2"
        actions={
          <Button variant="outline" size="xs">
            Roll back
          </Button>
        }
      />
      <TimelineItem tone="brand" title="Variable DATABASE_URL changed" time="3 days ago" />
      <TimelineItem title="Created" time="Oct 2" />
    </Timeline>
  ),
}

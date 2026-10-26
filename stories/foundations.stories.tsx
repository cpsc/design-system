import type { Meta, StoryObj } from "@storybook/react-vite"

import { useState } from "react"
import CaretRightIcon from "~icons/ph/caret-right"

import { Logo, Mark } from "../src/components/brand"
import { Button } from "../src/components/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../src/components/collapsible"
import { usePresence } from "../src/components/presence"
import { SwapText } from "../src/components/swap-text"

// Static class names only, so Tailwind finds every one of them.
const meta = {
  title: "Foundations",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Swatch({ className, name }: { className: string; name: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-10 w-24 rounded-md border border-v2-border ${className}`} />
      <span className="type-mono text-secondary">{name}</span>
    </div>
  )
}

export const Brand: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose text-secondary">
        Zeabur violet (#6300FF) for primary actions, links and focus; the mark's orange-red for
        errors. The logo is drawn in the text colour with the mark's own colours.
      </p>
      <div className="flex flex-wrap items-center gap-8">
        <Logo className="h-6" />
        <Mark className="h-8" />
        <span className="brand-logo h-5 text-secondary" />
        <span className="brand-mark h-6 text-brand" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Swatch className="bg-primary" name="primary" />
        <Swatch className="bg-brand" name="brand" />
        <Swatch className="bg-brand-soft" name="brand-soft" />
        <Swatch className="bg-error" name="error" />
        <Swatch className="bg-success" name="success" />
        <Swatch className="bg-ring" name="ring" />
      </div>
    </div>
  ),
}

const palettes = {
  zGray: [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950],
  zViolet: [50, 100, 300, 400, 500, 600, 700, 800, 900, 950],
  zOrangered: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
} as const

function PaletteSwatch({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-10 w-24 rounded-md border border-v2-border bg-(--swatch)"
        style={{ "--swatch": `var(--color-${name})` } as React.CSSProperties}
      />
      <span className="type-mono text-secondary">{name}</span>
    </div>
  )
}

export const Palettes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {Object.entries(palettes).map(([palette, steps]) => (
        <div key={palette} className="flex flex-wrap gap-2">
          {steps.map((step) => (
            <PaletteSwatch key={step} name={`${palette}-${step}`} />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Surfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Swatch className="bg-surface-page" name="surface-page" />
        <Swatch className="bg-surface-frame" name="surface-frame" />
        <Swatch className="bg-card" name="card" />
        <Swatch className="bg-chrome" name="chrome" />
        <Swatch className="bg-v2-surface-hover" name="v2-surface-hover" />
        <Swatch className="bg-v2-surface-active" name="v2-surface-active" />
        <Swatch className="bg-v2-border" name="v2-border" />
        <Swatch className="bg-v2-separator" name="v2-separator" />
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-v2-border bg-card p-5">
        <p className="text-main">text-main: what is read first</p>
        <p className="text-secondary">text-secondary: descriptions, idle navigation</p>
        <p className="text-tertiary">text-tertiary: placeholders, hints, section labels</p>
        <p className="mt-2 border-t border-main pt-2 text-secondary">border-main above</p>
      </div>
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose text-secondary">
        A colour for dots, a soft one for pill fills, a strong one for pill text.
      </p>
      <div className="grid grid-cols-3 gap-4 sm:w-fit">
        <Swatch className="bg-ok" name="ok" />
        <Swatch className="bg-ok-soft" name="ok-soft" />
        <Swatch className="bg-ok-strong" name="ok-strong" />
        <Swatch className="bg-progress" name="progress" />
        <Swatch className="bg-progress-soft" name="progress-soft" />
        <Swatch className="bg-progress-strong" name="progress-strong" />
        <Swatch className="bg-warn" name="warn" />
        <Swatch className="bg-warn-soft" name="warn-soft" />
        <Swatch className="bg-warn-strong" name="warn-strong" />
        <Swatch className="bg-fail" name="fail" />
        <Swatch className="bg-fail-soft" name="fail-soft" />
        <Swatch className="bg-fail-strong" name="fail-strong" />
        <Swatch className="bg-idle" name="idle" />
        <Swatch className="bg-idle-soft" name="idle-soft" />
        <Swatch className="bg-idle-strong" name="idle-strong" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Swatch className="bg-usage-normal" name="usage-normal" />
        <Swatch className="bg-usage-warning" name="usage-warning" />
        <Swatch className="bg-usage-severe" name="usage-severe" />
        <Swatch className="bg-chart-1" name="chart-1" />
        <Swatch className="bg-chart-2" name="chart-2" />
        <Swatch className="bg-chart-3" name="chart-3" />
        <Swatch className="bg-chart-4" name="chart-4" />
        <Swatch className="bg-chart-5" name="chart-5" />
      </div>
    </div>
  ),
}

export const Type: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <p className="type-title">type-title: Projects</p>
      <p className="type-name">type-name: my-service</p>
      <p className="type-heading">type-heading: Delete this service?</p>
      <p className="type-body">type-body: 13px, body text and navigation.</p>
      <p className="type-meta text-secondary">type-meta: 12px, descriptions and meta.</p>
      <p className="type-label">type-label: Workspace</p>
      <p className="type-micro text-secondary">type-micro: 11px hints</p>
      <p className="type-nano text-secondary">type-nano: 10px counts</p>
      <p className="type-kbd text-tertiary">type-kbd: 10px on 15, a key cap's keys</p>
      <p className="type-figure">type-figure: 42.5 GiB</p>
      <p className="type-mono">type-mono: ghcr.io/example/app:1.2.3</p>
      <p lang="zh-TW">中文與 Latin 混排，數字 123 也一樣。</p>
    </div>
  ),
}

function MotionDemo() {
  const statuses = ["Deploying", "Running", "Crashed"]
  const [step, setStep] = useState(0)
  const [shown, setShown] = useState(true)
  const presence = usePresence<HTMLDivElement>(shown)
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <p className="text-secondary">
        One curve (`ease-emphasized`) and four durations: `duration-micro` 80, `-quick` 150, `-fast`
        250, `-medium` 350. With reduced motion only opacity and colour change.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="secondary" size="sm" onClick={() => setStep((n) => n + 1)}>
          Change
        </Button>
        <span className="font-medium text-main">
          <SwapText>{statuses[step % statuses.length]}</SwapText>
        </span>
        <span className="type-figure tabular-nums">
          <SwapText variant="number">{`${(step * 7) % 100} GiB`}</SwapText>
        </span>
      </div>
      <Collapsible>
        <CollapsibleTrigger variant="disclosure">
          <CaretRightIcon aria-hidden="true" />
          Build log
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="pt-2 text-secondary">
            Opens and closes in 250ms; the chevron turns with it.
          </p>
        </CollapsibleContent>
      </Collapsible>
      <div className="group h-10 w-80 rounded-md border border-v2-border bg-surface-frame p-1">
        <div className="slide h-full w-1/3 rounded border border-v2-border bg-card group-hover:translate-x-2/1" />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Button variant="secondary" size="sm" onClick={() => setShown((s) => !s)}>
          {shown ? "Hide" : "Show"}
        </Button>
        {presence.mounted ? (
          <div
            {...presence.props}
            className="rounded-lg border border-v2-border bg-card p-4 dialog-motion"
          >
            usePresence keeps this mounted until its exit ends.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export const Motion: Story = {
  render: () => <MotionDemo />,
}

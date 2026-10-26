import type { Meta, StoryObj } from "@storybook/react-vite"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Badge } from "../src/components/badge"
import { Button } from "../src/components/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../src/components/chart"
import { SectionHeader } from "../src/components/section-header"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/table"
import { Term, TermDetail } from "../src/components/term"

const meta = {
  title: "Components/Data",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { domain: "app.example.com", status: "ok", label: "Verified", region: "Tokyo" },
  { domain: "api.example.com", status: "progress", label: "Verifying", region: "Taipei" },
  { domain: "old.example.com", status: "fail", label: "Failed", region: "Frankfurt" },
] as const

function Rows() {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead>Domain</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Region</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.domain}>
            <TableCell className="type-mono">{row.domain}</TableCell>
            <TableCell>
              <Badge variant={row.status}>{row.label}</Badge>
            </TableCell>
            <TableCell className="text-secondary">{row.region}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  )
}

export const Tables: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <TableContainer>
        <Table variant="ruled">
          <Rows />
        </Table>
      </TableContainer>
      <Table>
        <Rows />
      </Table>
    </div>
  ),
}

const config = {
  web: { label: "web", color: "var(--chart-1)" },
  worker: { label: "worker", color: "var(--chart-2)" },
} satisfies ChartConfig

const data = Array.from({ length: 24 }, (_, hour) => ({
  hour: `${hour}:00`,
  web: Math.round(30 + 20 * Math.sin(hour / 3)),
  worker: Math.round(15 + 10 * Math.cos(hour / 4)),
}))

export const Chart: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-2xl">
      <AreaChart data={data} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="hour" tickLine={false} axisLine={false} minTickGap={24} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="web" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.12} />
        <Area dataKey="worker" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.12} />
      </AreaChart>
    </ChartContainer>
  ),
}

export const Terms: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <SectionHeader
        title={<Term detail="Service">Private network</Term>}
        description="Other services in this cluster reach api at this address. The internet can't."
        action={
          <Button variant="outline" size="sm">
            Add domain
          </Button>
        }
      />
      <SectionHeader size="sm" title="Domains" count={2} />
      <dl className="grid grid-cols-2 gap-2 type-body">
        <dt className="text-secondary">
          <Term detail="requests.memory">Memory reserved</Term>
        </dt>
        <dd className="font-mono">128Mi</dd>
        <dt className="text-secondary">
          Type <TermDetail>ClusterIP</TermDetail>
        </dt>
        <dd className="font-mono">10.43.0.12</dd>
      </dl>
    </div>
  ),
}

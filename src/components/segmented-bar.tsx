import { cn } from "cn"

const USAGE_COLOR_NORMAL = "var(--usage-normal)"
const USAGE_COLOR_WARNING = "var(--usage-warning)"
const USAGE_COLOR_SEVERE = "var(--usage-severe)"
const EMPTY = "var(--track)"

function getUsageColor(value: number, warning = 0.7, severe = 0.85) {
  if (value >= severe) return USAGE_COLOR_SEVERE
  if (value >= warning) return USAGE_COLOR_WARNING
  return USAGE_COLOR_NORMAL
}

/** `value` is a share of the whole bar, 0 to 1. */
type BarPart = { value: number; color: string }

/** Stacked parts as cell ranges: boundaries follow the running total so slices never drift
 * apart, and a part above zero always has at least one cell. */
function partRanges(parts: readonly BarPart[], segments: number) {
  const ranges: { start: number; end: number; color: string }[] = []
  let total = 0
  let cursor = 0
  for (const part of parts) {
    total += Math.max(0, part.value)
    let end = Math.min(segments, Math.round(total * segments))
    if (end <= cursor && part.value > 0) end = Math.min(segments, cursor + 1)
    if (end > cursor) ranges.push({ start: cursor, end, color: part.color })
    cursor = end
  }
  return ranges
}

function barGradient(
  ranges: readonly { start: number; end: number; color: string }[],
  segments: number,
) {
  const at = (cell: number) => `${((2 * cell) / (2 * segments - 1)) * 100}%`
  const stops: string[] = []
  let cursor = 0
  for (const range of ranges) {
    if (range.start > cursor) stops.push(`${EMPTY} ${at(cursor)} ${at(range.start)}`)
    stops.push(`${range.color} ${at(range.start)} ${at(range.end)}`)
    cursor = range.end
  }
  if (cursor < segments) stops.push(`${EMPTY} ${at(cursor)} 100%`)
  return `linear-gradient(to right, ${stops.join(", ")})`
}

function SegmentedBar({
  value,
  parts,
  segments = 60,
  warning = 0.7,
  severe = 0.85,
  label,
  className,
}: {
  /** 0 to 1. */
  value: number
  parts?: readonly BarPart[]
  segments?: number
  warning?: number
  severe?: number
  /** Without it the bar is hidden from assistive technology. */
  label?: string
  className?: string
}) {
  const filled = Math.min(segments, Math.max(0, Math.round(value * segments)))
  const ranges = parts
    ? partRanges(parts, segments)
    : filled > 0
      ? [{ start: 0, end: filled, color: getUsageColor(value, warning, severe) }]
      : []
  const cell = `${100 / (2 * segments - 1)}%`
  return (
    <div
      data-slot="segmented-bar"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={
        {
          "--bar": barGradient(ranges, segments),
          "--cell": cell,
        } as React.CSSProperties
      }
      className={cn("h-1.5 w-full flex-none segmented-cells", className)}
    />
  )
}

export {
  SegmentedBar,
  getUsageColor,
  USAGE_COLOR_NORMAL,
  USAGE_COLOR_WARNING,
  USAGE_COLOR_SEVERE,
  type BarPart,
}

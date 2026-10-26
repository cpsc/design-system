import { cn } from "cn"

const columns = [0, 1, 2, 3, 4] as const

function Dots({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="currentColor"
      className={cn("size-3.5 shrink-0", className)}
      {...props}
    >
      {columns.map((x) =>
        columns.map((y) => (
          <rect
            key={`${x},${y}`}
            x={x * 3}
            y={y * 3}
            width="2"
            height="2"
            rx="0.5"
            className="dot-wave"
            style={{ "--dot-delay": `${x * 120}ms` } as React.CSSProperties}
          />
        )),
      )}
    </svg>
  )
}

const dotSizes = { sm: "size-3.5", md: "size-5.75", lg: "size-8" } as const

function LoadingDots({
  size = "sm",
  tone = "current",
  className,
}: {
  size?: keyof typeof dotSizes
  tone?: "current" | "secondary" | "brand"
  className?: string
}) {
  return (
    <Dots
      aria-hidden="true"
      className={cn(
        dotSizes[size],
        tone === "secondary" && "text-secondary",
        tone === "brand" && "text-brand",
        className,
      )}
    />
  )
}

/** Pass `aria-label` when "Loading" is not the right word or language. */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Dots
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-3.5", className)}
      {...props}
    />
  )
}

export { LoadingDots, Spinner }

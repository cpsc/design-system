import { cn } from "cn"
import { useState } from "react"

/** Fades in each new value of `children`; the first value renders without motion. */
function SwapText({
  children,
  variant = "text",
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  children: string | number
  /** `number` fades only, for figures that change in place. */
  variant?: "text" | "number"
}) {
  const value = String(children)
  const [previous, setPrevious] = useState(value)
  const [changed, setChanged] = useState(false)
  if (previous !== value) {
    setPrevious(value)
    setChanged(true)
  }
  return (
    <span
      key={value}
      data-slot="swap-text"
      className={cn(
        "inline-block",
        changed && (variant === "number" ? "reveal-in" : "swap-in"),
        className,
      )}
      {...props}
    >
      {value}
    </span>
  )
}

export { SwapText }

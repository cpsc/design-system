import { cn } from "cn"

function IconBox({
  tone = "violet",
  from = `var(--tile-${tone}-from)`,
  to = `var(--tile-${tone}-to)`,
  size = "md",
  className,
  children,
}: {
  tone?: "violet" | "orangered" | "green"
  from?: string
  to?: string
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      data-slot="icon-box"
      aria-hidden="true"
      style={{ "--from": from, "--to": to } as React.CSSProperties}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center bg-linear-to-b from-(--from) to-(--to) shadow-icon-box",
        size === "sm" && "size-8 rounded-md [&_svg]:size-5",
        size === "md" && "size-10 rounded-lg [&_svg]:size-6",
        size === "lg" && "size-12 rounded-xl [&_svg]:size-7",
        className,
      )}
    >
      <span className="relative inline-flex items-center justify-center drop-shadow-tile-icon">
        <span className="absolute inset-0 inline-flex items-center justify-center text-on-primary/30">
          {children}
        </span>
        <span className="relative inline-flex items-center justify-center text-on-primary mask-fade-down">
          {children}
        </span>
      </span>
    </span>
  )
}

export { IconBox }

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const emptyVariants = cva(
  "group/empty flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl px-6 py-12 text-center text-balance",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-dashed border-v2-border",
      },
      size: {
        default: "",
        sm: "gap-3 p-6",
        // One line in a section's place: what would be here and how to get it, its action at the end.
        inline:
          "flex-none flex-row flex-wrap justify-start gap-x-3 gap-y-2 px-4 py-3 text-left text-pretty",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Empty({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>) {
  return (
    <div
      data-slot="empty"
      data-size={size}
      className={cn(emptyVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-1.5 group-data-[size=inline]/empty:max-w-none group-data-[size=inline]/empty:min-w-0 group-data-[size=inline]/empty:flex-1 group-data-[size=inline]/empty:items-start group-data-[size=inline]/empty:gap-0.5",
        className,
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center group-data-[size=inline]/empty:mb-0 group-data-[size=inline]/empty:self-start [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-12 rounded-xl bg-linear-to-b from-tile-violet-from to-tile-violet-to text-on-primary shadow-tile [&_svg:not([class*='size-'])]:size-6",
        // A plain glyph beside an inline empty state's first line.
        glyph: "h-5 text-tertiary [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "type-heading text-main group-data-[size=inline]/empty:type-body group-data-[size=inline]/empty:font-medium",
        className,
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "max-w-105 type-body text-secondary group-data-[size=inline]/empty:max-w-prose [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-main",
        className,
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-balance group-data-[size=inline]/empty:w-auto group-data-[size=inline]/empty:max-w-none group-data-[size=inline]/empty:flex-row group-data-[size=inline]/empty:flex-wrap group-data-[size=inline]/empty:gap-2",
        className,
      )}
      {...props}
    />
  )
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia, emptyVariants }

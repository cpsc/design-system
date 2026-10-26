import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ReactNode } from "react"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-avatar align-middle font-medium text-secondary select-none",
  {
    variants: {
      size: {
        xs: "size-5 type-nano",
        sm: "size-7 text-xs",
        md: "size-9 text-sm",
        lg: "size-11 text-base",
      },
      shape: {
        square: "rounded",
        circle: "rounded-full",
      },
    },
    defaultVariants: { size: "md", shape: "square" },
  },
)

function Avatar({
  src,
  name,
  fallbackIcon,
  contain = false,
  size,
  shape,
  className,
}: VariantProps<typeof avatarVariants> & {
  src?: string
  /** The image's alt text, and the initials while there is no image. */
  name?: string
  /** Shown instead of initials when there is no name. */
  fallbackIcon?: ReactNode
  contain?: boolean
  className?: string
}) {
  const initials = (name || "?").slice(0, 2).toUpperCase()
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={name ?? ""}
          loading="lazy"
          className={cn("size-full", contain ? "object-contain" : "object-cover")}
        />
      ) : null}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center [&_svg]:size-1/2">
        {fallbackIcon && !name ? fallbackIcon : initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar, avatarVariants }

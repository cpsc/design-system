import * as React from "react"
import { cn } from "cn"

import {
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardActionVariants,
  cardContentVariants,
  cardFooterVariants,
} from "../variants/card"

function Card({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm"; variant?: "default" | "list" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(cardVariants(), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn(cardHeaderVariants(), className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn(cardTitleVariants(), className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(cardDescriptionVariants(), className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn(cardActionVariants(), className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn(cardContentVariants(), className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn(cardFooterVariants(), className)} {...props} />
}

function CardRow({
  label,
  description,
  align = "center",
  className,
  children,
}: {
  label: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "start"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="card-row"
      className={cn(
        "flex flex-col gap-3 px-5 py-4 sm:flex-row sm:gap-6",
        align === "center" ? "items-start sm:items-center" : "items-start",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-main">{label}</div>
        {description === undefined ? null : (
          <div className="mt-0.5 type-body text-secondary">{description}</div>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function SectionLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-label"
      className={cn("mb-3 type-body font-medium text-main", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardRow,
  SectionLabel,
}

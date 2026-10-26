import { cn } from "cn"
import type { ReactNode } from "react"

/**
 * Exactly the viewport, and the document never scrolls: the sidebar's middle and the panel's content
 * scroll inside. Clipped rather than hidden, so focus or scrollIntoView cannot scroll the frame.
 */
function AppFrame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-frame"
      className={cn("flex h-dvh overflow-clip bg-background text-foreground", className)}
      {...props}
    />
  )
}

/** Folding clips the sidebar rather than reflowing it, and hides it once the motion has ended. */
function FrameSidebar({
  collapsed = false,
  className,
  children,
}: {
  collapsed?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      data-slot="frame-sidebar"
      data-collapsed={collapsed ? "" : undefined}
      className={cn(
        "hidden w-sidebar shrink-0 overflow-clip border-r border-main bg-chrome data-collapsed:w-0 data-collapsed:border-r-0 md:block motion-safe:transition-width motion-safe:duration-fast motion-safe:ease-emphasized",
        className,
      )}
    >
      <div
        inert={collapsed || undefined}
        className={cn(
          "flex h-full min-h-0 w-sidebar flex-col transition-visibility duration-0",
          collapsed && "invisible motion-safe:delay-250",
        )}
      >
        {children}
      </div>
    </div>
  )
}

function FramePanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-panel"
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col overflow-clip bg-background text-main",
        className,
      )}
      {...props}
    />
  )
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 border-b border-v2-border px-4",
        className,
      )}
      {...props}
    />
  )
}

export { AppFrame, FramePanel, FrameSidebar, PanelHeader }

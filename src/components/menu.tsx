import type { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"

import {
  PendingRoot,
  PendingTrigger,
  useLoadedPopups,
  useOpen,
  usePopups,
  type RootProps,
  type TriggerProps,
} from "./popup"

function Menu({ open, defaultOpen, onOpenChange, ...props }: RootProps<MenuPrimitive.Root.Props>) {
  const state = useOpen(open, defaultOpen, onOpenChange)
  if (!state.parts) return <PendingRoot setOpen={state.setOpen}>{props.children}</PendingRoot>
  return (
    <state.parts.Menu.Root
      data-slot="menu"
      {...props}
      open={state.open}
      onOpenChange={(next) => state.setOpen(next)}
    />
  )
}

function MenuTrigger({ className, ...props }: TriggerProps<MenuPrimitive.Trigger.Props>) {
  const parts = usePopups()
  if (!parts)
    return (
      <PendingTrigger haspopup="menu" data-slot="menu-trigger" className={className} {...props} />
    )
  return <parts.Menu.Trigger data-slot="menu-trigger" className={className} {...props} />
}

function MenuContent({
  className,
  align = "end",
  ...props
}: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, "align">) {
  const parts = usePopups()
  if (!parts) return null
  const { Menu: M } = parts
  return (
    <M.Portal>
      <M.Positioner className="isolate z-popup" align={align} sideOffset={4} collisionPadding={8}>
        <M.Popup
          data-slot="menu-content"
          className={cn(
            "min-w-56 overflow-hidden rounded-md border border-v2-border bg-popover p-1 text-sm text-popover-foreground shadow-lg outline-none popup-motion",
            className,
          )}
          {...props}
        />
      </M.Positioner>
    </M.Portal>
  )
}

function MenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  const { Menu: M } = useLoadedPopups()
  return (
    <M.Item
      data-slot="menu-item"
      className={cn(
        "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-secondary transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-v2-surface-hover data-highlighted:text-main [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  const { Menu: M } = useLoadedPopups()
  return (
    <M.Separator
      data-slot="menu-separator"
      className={cn("-mx-1 my-1 h-px bg-v2-border", className)}
      {...props}
    />
  )
}

function MenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menu-label"
      className={cn("px-2.5 pt-2 pb-1 type-label", className)}
      {...props}
    />
  )
}

export { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuLabel }

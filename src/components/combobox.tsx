"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { cn } from "cn"
import CaretDownIcon from "~icons/ph/caret-down"
import CheckIcon from "~icons/ph/check"

const Combobox = ComboboxPrimitive.Root

function ComboboxInput({
  className,
  size = "default",
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & { size?: "default" | "sm" }) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input"
      data-size={size}
      className={cn(
        "group/combobox relative flex w-full items-center rounded-md border border-input bg-transparent transition-field duration-150 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/20 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-control-md data-[size=sm]:h-control-xs",
        className,
      )}
    >
      <ComboboxPrimitive.Input
        className="size-full min-w-0 rounded-md bg-transparent pr-8 pl-3 text-base text-main outline-none placeholder:text-tertiary sm:text-sm group-data-[size=sm]/combobox:text-xs"
        {...props}
      />
      <ComboboxPrimitive.Trigger
        aria-hidden="true"
        tabIndex={-1}
        className="absolute right-1 flex size-control-xs items-center justify-center rounded text-secondary"
      >
        <CaretDownIcon className="size-3.5" />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.InputGroup>
  )
}

function ComboboxContent({ className, children, ...props }: ComboboxPrimitive.Popup.Props) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner className="isolate z-popup" sideOffset={6} collisionPadding={8}>
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "max-h-listbox w-(--anchor-width) overflow-y-auto rounded-lg border border-v2-border bg-popover p-1 text-sm text-popover-foreground shadow-md outline-none popup-motion",
            className,
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-main transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-v2-surface-hover data-selected:bg-v2-surface-active",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator className="flex shrink-0 text-main">
        <CheckIcon className="size-4" aria-hidden="true" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("px-2 py-1.5 type-body text-secondary empty:hidden", className)}
      {...props}
    />
  )
}

export { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty }

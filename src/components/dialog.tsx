import type { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import XIcon from "~icons/ph/x"

import { PendingRoot, useLoadedPopups, useOpen, usePopups, type RootProps } from "./popup"

function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: RootProps<DialogPrimitive.Root.Props>) {
  const state = useOpen(open, defaultOpen, onOpenChange)
  if (!state.parts) return <PendingRoot setOpen={state.setOpen}>{props.children}</PendingRoot>
  return (
    <state.parts.Dialog.Root
      data-slot="dialog"
      {...props}
      open={state.open}
      onOpenChange={(next) => state.setOpen(next)}
    />
  )
}

const dialogContentVariants = cva(
  "fixed top-1/2 left-1/2 z-popup max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-v2-border bg-popover text-popover-foreground shadow-xl outline-none",
  {
    variants: {
      variant: {
        default: "w-dialog dialog-motion",
        sheet:
          "top-0 left-0 h-svh w-sheet max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 border-main bg-chrome sheet-motion-start",
        panel:
          "top-0 right-0 left-auto flex h-svh w-full max-w-none translate-x-0 translate-y-0 flex-col rounded-none border-y-0 border-r-0 sheet-motion-end sm:max-w-2xl",
        wide: "flex max-h-dialog w-dialog max-w-3xl flex-col dialog-motion",
        compact: "flex max-h-dialog w-dialog flex-col dialog-motion",
      },
      position: {
        center: "",
        top: "top-24 origin-top translate-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "center",
    },
  },
)

function DialogContent({
  className,
  backdropClassName,
  variant = "default",
  position = "center",
  ...props
}: DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & { backdropClassName?: string }) {
  const parts = usePopups()
  if (!parts) return null
  const { Dialog: D } = parts
  return (
    <D.Portal>
      <D.Backdrop
        className={cn("fixed inset-0 z-popup bg-overlay overlay-motion", backdropClassName)}
      />
      <D.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ variant, position, className }))}
        {...props}
      />
    </D.Portal>
  )
}

const dialogHeaderVariants = cva("flex shrink-0 items-start justify-between gap-4 px-6", {
  variants: {
    variant: {
      default: "pt-5",
      panel: "border-b border-v2-border py-4",
    },
  },
  defaultVariants: { variant: "default" },
})

function DialogHeader({
  className,
  variant,
  close = true,
  closeLabel = "Close",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof dialogHeaderVariants> & {
    close?: boolean
    closeLabel?: string
  }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(dialogHeaderVariants({ variant }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {close ? <DialogCloseButton label={closeLabel} /> : null}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  const { Dialog: D } = useLoadedPopups()
  return (
    <D.Title
      data-slot="dialog-title"
      className={cn("type-heading text-main", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  const { Dialog: D } = useLoadedPopups()
  return (
    <D.Description
      data-slot="dialog-description"
      className={cn("text-sm text-secondary", className)}
      {...props}
    />
  )
}

const dialogBodyVariants = cva("min-h-0 min-w-0 flex-1 overflow-y-auto px-6", {
  variants: {
    variant: {
      default: "pt-4 pb-6",
      panel: "py-5",
    },
  },
  defaultVariants: { variant: "default" },
})

function DialogBody({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof dialogBodyVariants>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(dialogBodyVariants({ variant }), className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex shrink-0 items-center justify-end gap-2 border-t border-v2-border bg-v2-surface-hover px-6 py-3",
        className,
      )}
      {...props}
    />
  )
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  const { Dialog: D } = useLoadedPopups()
  return <D.Close {...props} />
}

function DialogCloseButton({ label = "Close", className }: { label?: string; className?: string }) {
  const { Dialog: D } = useLoadedPopups()
  return (
    <D.Close
      aria-label={label}
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded text-secondary transition-colors hover:bg-v2-surface-hover hover:text-main",
        className,
      )}
    >
      <XIcon className="size-4" aria-hidden="true" />
    </D.Close>
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogCloseButton,
  dialogContentVariants,
}

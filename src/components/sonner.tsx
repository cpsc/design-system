import { Toaster as Sonner, type ToasterProps } from "sonner"
import CheckIcon from "~icons/ph/check-circle-fill"
import InfoIcon from "~icons/ph/info-fill"
import WarningIcon from "~icons/ph/warning-fill"
import XIcon from "~icons/ph/x-circle-fill"

import { LoadingDots } from "./spinner"

// Sonner adds a <style> element when this chunk loads, so the page's Content Security Policy must
// allow inline styles.

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="group"
      icons={{
        success: <CheckIcon className="size-4 text-success" aria-hidden="true" />,
        info: <InfoIcon className="size-4 text-brand" aria-hidden="true" />,
        warning: <WarningIcon className="size-4 text-warn" aria-hidden="true" />,
        error: <XIcon className="size-4 text-error" aria-hidden="true" />,
        loading: <LoadingDots tone="secondary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-lg! border-v2-border! shadow-lg! px-4! py-3! gap-2.5! type-body! items-start! font-sans! duration-medium! ease-emphasized! data-[removed=true]:duration-quick!",
          title: "font-medium! leading-5!",
          description: "text-secondary! leading-5!",
          icon: "mt-0.5! size-4! ms-0! me-0!",
          actionButton: "bg-toast-action! text-main! rounded-md! font-medium!",
          cancelButton: "bg-toast-action! text-main! rounded-md! font-medium!",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border-popover)",
          "--border-radius": "8px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

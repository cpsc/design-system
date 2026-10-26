import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"
import { useState, type ReactElement, type ReactNode } from "react"

import { PendingTooltipTrigger, usePopups } from "./popup"

function TooltipProvider(props: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={300} {...props} />
}

/** `children` must be a single element that takes a ref. */
function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  className,
}: {
  content: ReactNode
  children: ReactElement
  side?: TooltipPrimitive.Positioner.Props["side"]
  align?: TooltipPrimitive.Positioner.Props["align"]
  className?: string
}) {
  const parts = usePopups()
  // Pointed at or focused before the code arrived: open once it does.
  const [shown, setShown] = useState(false)
  if (!parts) return <PendingTooltipTrigger onShow={setShown}>{children}</PendingTooltipTrigger>
  const { Tooltip: T } = parts
  return (
    <T.Root defaultOpen={shown}>
      <T.Trigger render={children} />
      <T.Portal>
        <T.Positioner side={side} align={align} sideOffset={6} className="isolate z-tooltip">
          <T.Popup
            className={cn(
              "w-fit max-w-xs rounded-lg px-3 py-1.5 text-xs whitespace-normal text-main surface-glass tooltip-motion",
              className,
            )}
          >
            {content}
          </T.Popup>
        </T.Positioner>
      </T.Portal>
    </T.Root>
  )
}

export { Tooltip, TooltipProvider }

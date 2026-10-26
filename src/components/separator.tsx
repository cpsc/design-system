import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

import { separatorVariants } from "../variants/separator"

function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(separatorVariants(), className)}
      {...props}
    />
  )
}

export { Separator }

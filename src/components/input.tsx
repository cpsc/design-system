import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { inputVariants } from "../variants/input"

function Input({
  className,
  type,
  size,
  mono,
  endSlot,
  tone,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      spellCheck={mono ? false : undefined}
      translate={mono ? "no" : undefined}
      className={cn(inputVariants({ size, mono, endSlot, tone }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }

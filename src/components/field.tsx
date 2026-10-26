"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"
import { cn } from "cn"

import {
  fieldVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
} from "../variants/field"

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root data-slot="field" className={cn(fieldVariants(), className)} {...props} />
  )
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(fieldLabelVariants(), className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn(fieldDescriptionVariants(), className)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn(fieldErrorVariants(), className)}
      {...props}
    />
  )
}

const FieldControl = FieldPrimitive.Control

export { Field, FieldControl, FieldDescription, FieldError, FieldLabel }

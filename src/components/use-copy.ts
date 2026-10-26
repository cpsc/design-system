import { useState } from "react"

/** Copies `value`; `copied` stays true for 1.5 s after a copy works. */
export function useCopy(
  value: string,
  onCopy?: () => void,
  onCopyError?: (error: unknown) => void,
) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
      onCopy?.()
    } catch (error) {
      setCopied(false)
      onCopyError?.(error)
    }
  }
  return { copied, copy }
}

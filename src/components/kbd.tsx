import { cn } from "cn"

/** The keys of a shortcut written as one string: words apart are keys (`Ctrl K`, `Shift Enter`);
 * otherwise a leading modifier symbol is its own key (`⌘K` is ⌘ and K, `⇧⌘P` is ⇧ and ⌘P). */
function shortcutKeys(shortcut: string): string[] {
  const trimmed = shortcut.trim()
  if (trimmed === "") return []
  const words = trimmed.split(/\s+/)
  if (words.length > 1) return words
  const modifier = /^[⌘⌥⇧⌃]/u.exec(trimmed)?.[0]
  return modifier === undefined || modifier === trimmed
    ? [trimmed]
    : [modifier, trimmed.slice(modifier.length)]
}

function keysOf(keys: string | readonly string[]): readonly string[] {
  return typeof keys === "string" ? shortcutKeys(keys) : keys
}

function Kbd({
  keys,
  className,
  children,
  ...props
}: React.ComponentProps<"kbd"> & {
  keys?: string | readonly string[]
}) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded border border-main px-1.5 py-0.5 font-sans type-kbd text-tertiary",
        className,
      )}
      {...props}
    >
      {keys === undefined ? children : keysOf(keys).map((key, i) => <span key={i}>{key}</span>)}
    </kbd>
  )
}

function KbdGroup({
  keys,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  keys: string | readonly string[]
}) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex shrink-0 items-center gap-1", className)}
      {...props}
    >
      {keysOf(keys).map((key, i) => (
        <Kbd key={i}>{key}</Kbd>
      ))}
    </span>
  )
}

export { Kbd, KbdGroup, shortcutKeys }

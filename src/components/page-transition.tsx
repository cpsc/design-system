import { useLayoutEffect, useRef } from "react"

const ease = "cubic-bezier(0.22, 1, 0.36, 1)"

/** Whether the browser runs typed view transitions; without them `usePageTransition` animates. */
function viewTransitionTypes() {
  return (
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function" &&
    CSS.supports("selector(:active-view-transition-type(a))")
  )
}

/**
 * The router's view transition for a move to another page: typed `page` (see the `page-transition`
 * utility) when the path changes, none when only the search or the hash does, nor on the first
 * load (no page to move from).
 */
const pageViewTransition = {
  types: ({ fromLocation, pathChanged }: { fromLocation?: unknown; pathChanged: boolean }) =>
    fromLocation && pathChanged ? ["page"] : false,
} as const

/**
 * Plays the page's entrance on the element when `key` changes, where the browser has no typed
 * view transitions to do it. The element takes `page-transition` either way.
 */
function usePageTransition<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null)
  const last = useRef(key)
  useLayoutEffect(() => {
    if (last.current === key) return
    last.current = key
    const element = ref.current
    if (!element || viewTransitionTypes() || typeof element.animate !== "function") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.animate(
      reduce
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, translate: "0 4px" },
            { opacity: 1, translate: "0 0" },
          ],
      { duration: reduce ? 150 : 250, easing: ease },
    )
  }, [key])
  return ref
}

export { pageViewTransition, usePageTransition, viewTransitionTypes }

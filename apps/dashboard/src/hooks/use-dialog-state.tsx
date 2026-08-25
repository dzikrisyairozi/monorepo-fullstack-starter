import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

/**
 * Tracks which single dialog (by name) is open at a time - common for
 * tables that need separate create/edit/delete/invite dialogs where
 * only one should ever be open.
 *
 * These dialogs are opened from a trigger button that lives outside the
 * Dialog's own tree (no DialogTrigger), so Radix has nothing to restore
 * focus to on close and leaves it on <body>. Remember the element that
 * had focus when a dialog opens and refocus it once the dialog closes,
 * after Radix's own close-focus handling has run.
 */
export function useDialogState<T extends string>(
  initialValue: T | null = null,
): [T | null, Dispatch<SetStateAction<T | null>>] {
  const [open, setOpenState] = useState<T | null>(initialValue);
  const openRef = useRef(open);
  openRef.current = open;
  const triggerRef = useRef<HTMLElement | null>(null);

  // The state updater passed to setOpenState must stay pure (React may
  // invoke it more than once under StrictMode), so the side effects live
  // here instead, computed against openRef rather than inside the updater.
  const setOpen = useCallback<Dispatch<SetStateAction<T | null>>>((value) => {
    const prev = openRef.current;
    const next =
      typeof value === 'function'
        ? (value as (prev: T | null) => T | null)(prev)
        : value;

    if (next !== null && prev === null) {
      triggerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    } else if (next === null && prev !== null) {
      const trigger = triggerRef.current;
      setTimeout(() => trigger?.focus(), 0);
    }

    openRef.current = next;
    setOpenState(next);
  }, []);

  return [open, setOpen];
}

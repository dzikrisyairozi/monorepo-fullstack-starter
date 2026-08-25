import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type SearchContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  const triggerRef = useRef<HTMLElement | null>(null);

  // The command dialog has no DialogTrigger (it opens from a header button
  // or a global keyboard shortcut), so Radix has nothing to restore focus
  // to on close and leaves it on <body>. Remember whatever had focus when
  // it opens and refocus it once it closes, after Radix's own handling.
  // The side effects live here, computed against openRef, rather than
  // inside the setOpenState updater - that updater must stay pure since
  // React may invoke it more than once under StrictMode.
  const setOpen = (next: boolean) => {
    const prev = openRef.current;
    if (next && !prev) {
      triggerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    } else if (!next && prev) {
      const trigger = triggerRef.current;
      setTimeout(() => trigger?.focus(), 0);
    }
    openRef.current = next;
    setOpenState(next);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

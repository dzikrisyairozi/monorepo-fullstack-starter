import { useEffect, useState, type ReactNode } from 'react';
import { SidebarTrigger } from '@repo/ui/components/ui/sidebar';
import { Separator } from '@repo/ui/components/ui/separator';
import { cn } from '@repo/ui/lib/utils';

export function Header({
  children,
  nav,
}: {
  children?: ReactNode;
  nav?: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 bg-white/50 px-4 backdrop-blur-md transition-shadow sm:h-16 sm:px-8 dark:bg-black/50',
        scrolled && 'shadow-sm',
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      {nav}
      <div className="ml-auto flex items-center gap-1 sm:gap-4">{children}</div>
    </header>
  );
}

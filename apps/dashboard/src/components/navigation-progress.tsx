import { useRouterState } from '@tanstack/react-router';
import { cn } from '@repo/ui/lib/utils';

export function NavigationProgress() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  return (
    <div
      role="progressbar"
      aria-hidden={!isLoading}
      className={cn(
        'fixed top-0 left-0 z-100 h-0.5 bg-primary transition-all motion-reduce:hidden',
        isLoading
          ? 'w-full duration-[2000ms] ease-out'
          : 'w-0 opacity-0 duration-200',
      )}
    />
  );
}

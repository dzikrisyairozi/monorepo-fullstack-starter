import { type ComponentProps } from 'react';
import { cn } from '@repo/ui/lib/utils';

export function Main({
  fixed,
  className,
  children,
  ...props
}: ComponentProps<'main'> & { fixed?: boolean }) {
  return (
    <main
      id="content"
      className={cn(
        'relative flex-1',
        fixed
          ? 'flex flex-col overflow-hidden'
          : 'overflow-auto p-3 pb-20 sm:p-6 lg:p-8',
        className,
      )}
      {...props}
    >
      {!fixed && (
        <>
          <div className="pointer-events-none absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] will-change-transform" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[120px] will-change-transform" />
        </>
      )}
      <div
        className={cn(
          'relative z-10',
          fixed
            ? 'flex flex-1 flex-col overflow-hidden'
            : 'mx-auto w-full max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500',
        )}
      >
        {children}
      </div>
    </main>
  );
}

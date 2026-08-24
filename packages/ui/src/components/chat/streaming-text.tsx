'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/use-prefers-reduced-motion';
import { cn } from '../../lib/utils';
import { SourceChipGroup, type ChatSource } from './source-chip';

export function StreamingText({
  text,
  sources = [],
  followUps = [],
  onFollowUpSelect,
  intervalMs = 20,
  charsPerTick = 2,
  onComplete,
  className,
}: {
  text: string;
  sources?: ChatSource[];
  followUps?: string[];
  onFollowUpSelect?: (value: string) => void;
  intervalMs?: number;
  charsPerTick?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleChars, setVisibleChars] = useState(
    prefersReducedMotion ? text.length : 0,
  );
  const [done, setDone] = useState(prefersReducedMotion);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Deferred so this doesn't call setState synchronously as the first
      // statement of the effect body.
      queueMicrotask(() => {
        setVisibleChars(text.length);
        setDone(true);
        onCompleteRef.current?.();
      });
      return;
    }

    // Deferred so this doesn't call setState synchronously as the first
    // statement of the effect body.
    queueMicrotask(() => {
      setVisibleChars(0);
      setDone(false);
    });

    // Progress lives in a plain closure variable, not state: the interval
    // callback needs to run side effects (clearInterval, onComplete) when
    // the stream finishes, and a setState updater function must stay pure -
    // React is free to invoke it more than once, which doubled the
    // onComplete calls when this logic lived inside setVisibleChars(prev => ...).
    let current = 0;
    const id = setInterval(() => {
      current = Math.min(current + charsPerTick, text.length);
      setVisibleChars(current);
      if (current >= text.length) {
        clearInterval(id);
        setDone(true);
        onCompleteRef.current?.();
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [text, intervalMs, charsPerTick, prefersReducedMotion]);

  const showExtras = done && (sources.length > 0 || followUps.length > 0);

  return (
    <div className={className}>
      <p className="text-sm whitespace-pre-wrap">
        {text.slice(0, visibleChars)}
        {!done && !prefersReducedMotion && (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-foreground align-middle motion-safe:animate-pulse"
          />
        )}
      </p>
      {showExtras && (
        <div className="mt-3 space-y-2 motion-safe:animate-in motion-safe:fade-in">
          {sources.length > 0 && <SourceChipGroup sources={sources} />}
          {followUps.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {followUps.map((followUp) => (
                <button
                  key={followUp}
                  type="button"
                  onClick={() => onFollowUpSelect?.(followUp)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs text-foreground',
                    'hover:bg-muted',
                  )}
                >
                  {followUp}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';

export type ThinkingStep = {
  id: string;
  label: string;
};

export type ThinkingSearchResult = {
  id: string;
  label: string;
};

export function ThinkingTrace({
  steps,
  durationLabel,
  reasoning,
  searchResults = [],
  className,
  stepsLabel,
  stepsTabLabel = 'Steps',
  reasoningTabLabel = 'Reasoning',
  searchTabLabel = 'Search',
  noReasoningLabel = 'No reasoning recorded.',
  noSearchResultsLabel = 'No search results.',
}: {
  steps: ThinkingStep[];
  durationLabel: string;
  reasoning?: string;
  searchResults?: ThinkingSearchResult[];
  className?: string;
  /** Pre-formatted, e.g. from an i18n plural rule. Defaults to English. */
  stepsLabel?: string;
  stepsTabLabel?: string;
  reasoningTabLabel?: string;
  searchTabLabel?: string;
  noReasoningLabel?: string;
  noSearchResultsLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn('rounded-md border bg-muted/40', className)}>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-xs text-muted-foreground"
      >
        <span>
          {stepsLabel ?? `${steps.length} step${steps.length === 1 ? '' : 's'}`}
        </span>
        <span className="flex items-center gap-2">
          <span className="rounded-full border bg-background px-1.5 py-0.5 font-mono text-[10px]">
            {durationLabel}
          </span>
          <ChevronDown
            className={cn(
              'size-3.5 shrink-0 transition-transform',
              expanded && 'rotate-180',
            )}
          />
        </span>
      </button>
      {expanded && (
        <div className="border-t px-3 py-2">
          <Tabs defaultValue="steps">
            <TabsList className="h-8">
              <TabsTrigger value="steps" className="text-xs">
                {stepsTabLabel}
              </TabsTrigger>
              <TabsTrigger value="reasoning" className="text-xs">
                {reasoningTabLabel}
              </TabsTrigger>
              <TabsTrigger value="search" className="text-xs">
                {searchTabLabel}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="steps" className="mt-2 space-y-1">
              {steps.map((step) => (
                <p key={step.id} className="text-xs text-muted-foreground">
                  {step.label}
                </p>
              ))}
            </TabsContent>
            <TabsContent
              value="reasoning"
              className="mt-2 text-xs whitespace-pre-wrap text-muted-foreground"
            >
              {reasoning || noReasoningLabel}
            </TabsContent>
            <TabsContent value="search" className="mt-2 space-y-1">
              {searchResults.length ? (
                searchResults.map((result) => (
                  <p key={result.id} className="text-xs text-muted-foreground">
                    {result.label}
                  </p>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  {noSearchResultsLabel}
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

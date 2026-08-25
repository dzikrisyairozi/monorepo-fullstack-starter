import { User } from 'lucide-react';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { Section } from '../section';

export function ScrollAreaSection() {
  return (
    <Section
      title="Scroll Area"
      description="Custom scrollable containers with styled scrollbars."
    >
      <ScrollArea className="h-72 w-full rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Item {i + 1}</p>
                <p className="text-xs text-muted-foreground">
                  Description for item {i + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Section>
  );
}

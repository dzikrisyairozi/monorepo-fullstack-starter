import { AlertCircle, Check } from 'lucide-react';
import { Badge } from '@repo/ui/components/ui/badge';
import { Section } from '../section';

export function BadgesSection() {
  return (
    <Section title="Badges" description="Small status indicators and labels.">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge className="border-0 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Check className="mr-1 h-3 w-3" /> Success
        </Badge>
        <Badge className="border-0 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          <AlertCircle className="mr-1 h-3 w-3" /> Warning
        </Badge>
      </div>
    </Section>
  );
}

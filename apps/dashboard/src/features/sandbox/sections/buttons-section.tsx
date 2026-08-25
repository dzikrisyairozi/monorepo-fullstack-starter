import { ExternalLink, Mail } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { Section } from '../section';

export function ButtonsSection() {
  return (
    <Section title="Buttons" description="Primary actions and interactions.">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button className="rounded-full shadow-lg">Rounded Full</Button>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            With Icon
          </Button>
        </div>
      </div>
    </Section>
  );
}

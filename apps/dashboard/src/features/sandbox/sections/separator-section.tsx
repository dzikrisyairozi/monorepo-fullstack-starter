import { Separator } from '@repo/ui/components/ui/separator';
import { Section } from '../section';

export function SeparatorSection() {
  return (
    <Section
      title="Separator"
      description="Visual dividers between content sections."
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">
            An open-source UI component library.
          </p>
        </div>
        <Separator />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    </Section>
  );
}

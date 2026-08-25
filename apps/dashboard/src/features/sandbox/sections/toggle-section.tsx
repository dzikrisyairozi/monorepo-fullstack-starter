import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from 'lucide-react';
import { Toggle } from '@repo/ui/components/ui/toggle';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@repo/ui/components/ui/toggle-group';
import { Section } from '../section';

export function ToggleSection() {
  return (
    <Section
      title="Toggle & Toggle Group"
      description="Pressable buttons that toggle between states."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
        <div>
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </Section>
  );
}

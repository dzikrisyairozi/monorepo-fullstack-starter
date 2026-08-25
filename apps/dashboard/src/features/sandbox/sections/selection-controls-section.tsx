import { useState } from 'react';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { Label } from '@repo/ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Switch } from '@repo/ui/components/ui/switch';
import { Section } from '../section';

export function SelectionControlsSection() {
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  return (
    <Section
      title="Selection Controls"
      description="Toggle states, make choices, and select options."
    >
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Checkbox</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={checkboxChecked}
                onCheckedChange={(v) => setCheckboxChecked(!!v)}
              />
              <Label htmlFor="terms" className="text-sm">
                Accept terms
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="text-sm">
                Email updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-check" disabled />
              <Label
                htmlFor="disabled-check"
                className="text-sm text-muted-foreground"
              >
                Disabled
              </Label>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Switch</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="airplane" className="text-sm">
                Airplane Mode
              </Label>
              <Switch
                id="airplane"
                checked={switchOn}
                onCheckedChange={setSwitchOn}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifs" className="text-sm">
                Notifications
              </Label>
              <Switch id="notifs" />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="disabled-switch"
                className="text-sm text-muted-foreground"
              >
                Disabled
              </Label>
              <Switch id="disabled-switch" disabled />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Radio Group</h4>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1" className="text-sm">
                Default
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2" className="text-sm">
                Comfortable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3" className="text-sm">
                Compact
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Section>
  );
}

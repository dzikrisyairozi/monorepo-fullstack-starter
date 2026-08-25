import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Progress } from '@repo/ui/components/ui/progress';
import { Slider } from '@repo/ui/components/ui/slider';
import { Section } from '../section';

export function SliderProgressSection() {
  const [progress, setProgress] = useState(45);
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <Section
      title="Slider & Progress"
      description="Interactive range inputs and loading indicators."
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            Slider — Value: {sliderValue[0]}
          </h4>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Progress</h4>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              -10
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              +10
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

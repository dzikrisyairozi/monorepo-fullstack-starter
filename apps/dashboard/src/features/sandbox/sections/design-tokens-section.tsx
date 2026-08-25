import { Section } from '../section';

const COLORS = [
  { name: 'Background', className: 'bg-background border' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Primary', className: 'bg-primary' },
  { name: 'Secondary', className: 'bg-secondary border' },
  { name: 'Muted', className: 'bg-muted border' },
  { name: 'Accent', className: 'bg-accent border' },
  { name: 'Destructive', className: 'bg-destructive' },
  { name: 'Card', className: 'bg-card border' },
  { name: 'Popover', className: 'bg-popover border' },
  { name: 'Border', className: 'bg-border' },
  { name: 'Input', className: 'bg-input' },
  { name: 'Ring', className: 'bg-ring' },
];

const RADII = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
  { name: '2xl', className: 'rounded-2xl' },
  { name: 'full', className: 'rounded-full' },
];

export function DesignTokensSection() {
  return (
    <Section
      title="Design System Tokens"
      description="Color palette, spacing, and typography used across the design system."
    >
      <div className="space-y-8">
        <div>
          <h4 className="mb-4 text-sm font-medium">Colors</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {COLORS.map((color) => (
              <div key={color.name} className="space-y-1.5">
                <div
                  className={`h-12 rounded-lg ${color.className} shadow-sm`}
                />
                <p className="text-center text-xs font-medium">{color.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Chart Colors</h4>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex-1 space-y-1.5">
                <div
                  className={`h-12 rounded-lg bg-chart-${n} shadow-sm`}
                  style={{ backgroundColor: `var(--chart-${n})` }}
                />
                <p className="text-center text-xs font-medium">Chart {n}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Typography Scale</h4>
          <div className="space-y-3 rounded-lg border p-4">
            <p className="text-4xl font-bold tracking-tight">
              Heading 1 — 4xl Bold
            </p>
            <p className="text-3xl font-bold tracking-tight">
              Heading 2 — 3xl Bold
            </p>
            <p className="text-2xl font-semibold">Heading 3 — 2xl Semibold</p>
            <p className="text-xl font-semibold">Heading 4 — xl Semibold</p>
            <p className="text-lg font-medium">Large — lg Medium</p>
            <p className="text-base">Body — base Regular</p>
            <p className="text-sm text-muted-foreground">Small — sm Muted</p>
            <p className="text-xs text-muted-foreground">
              Extra Small — xs Muted
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Border Radius</h4>
          <div className="flex flex-wrap gap-4">
            {RADII.map((r) => (
              <div key={r.name} className="space-y-1.5 text-center">
                <div
                  className={`h-16 w-16 border-2 border-primary/30 bg-primary/10 ${r.className}`}
                />
                <p className="text-xs font-medium">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

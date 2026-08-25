import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Section } from '../section';

const STACK_COLORS = [
  'bg-sky-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
];

export function AvatarSection() {
  return (
    <Section
      title="Avatar"
      description="User profile images with fallback initials."
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground">
            JD
          </AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-emerald-500 text-white">
            AB
          </AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-amber-500 text-xs text-white">
            XY
          </AvatarFallback>
        </Avatar>
        <div className="flex -space-x-3">
          {STACK_COLORS.map((bg, i) => (
            <Avatar key={i} className="h-10 w-10 border-2 border-background">
              <AvatarFallback className={`${bg} text-xs text-white`}>
                {String.fromCharCode(65 + i)}
                {String.fromCharCode(66 + i)}
              </AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback className="bg-muted text-xs text-muted-foreground">
              +5
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Section>
  );
}

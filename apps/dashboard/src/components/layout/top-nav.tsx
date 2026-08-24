import { Link, type LinkProps } from '@tanstack/react-router';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';

export type TopNavLink = {
  title: string;
  href: string;
  isActive: boolean;
};

export function TopNav({
  links,
  className,
}: {
  links: TopNavLink[];
  className?: string;
}) {
  return (
    <nav
      className={cn(
        'hidden min-w-0 items-center gap-1 overflow-x-auto lg:flex',
        className,
      )}
    >
      {links.map((link) => (
        <Button
          key={link.href}
          asChild
          variant={link.isActive ? 'secondary' : 'ghost'}
          size="sm"
        >
          <Link to={link.href as LinkProps['to']}>{link.title}</Link>
        </Button>
      ))}
    </nav>
  );
}

import { Palette } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Section } from '../section';

export function CardsSection() {
  return (
    <Section
      title="Cards"
      description="Container components for grouping related content."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the card body content showing a standard layout.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full">
              Action
            </Button>
          </CardFooter>
        </Card>
        <Card className="border-primary/20 transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">With Icon</CardTitle>
                <CardDescription>Enhanced card header.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cards can be customized with icons and colors.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-transparent transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Gradient</CardTitle>
            <CardDescription>A card with subtle gradient.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">@shadcn</p>
                <p className="text-xs text-muted-foreground">
                  Component library author
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

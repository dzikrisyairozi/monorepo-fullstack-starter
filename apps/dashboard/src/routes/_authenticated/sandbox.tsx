import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// UI Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/ui/accordion';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@repo/ui/components/ui/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Progress } from '@repo/ui/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Separator } from '@repo/ui/components/ui/separator';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { Slider } from '@repo/ui/components/ui/slider';
import { Switch } from '@repo/ui/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/ui/tabs';
import { Textarea } from '@repo/ui/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import { Toggle } from '@repo/ui/components/ui/toggle';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@repo/ui/components/ui/toggle-group';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@repo/ui/components/ui/hover-card';

// Icons
import {
  Terminal,
  AlertCircle,
  Check,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Mail,
  Palette,
  PanelLeft,
  ExternalLink,
  CalendarDays,
  Sparkles,
  User,
} from 'lucide-react';

import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { Header } from '../../components/layout/header';
import { Main } from '../../components/layout/main';
import { ThemeToggle } from '../../components/theme-toggle';

export const Route = createFileRoute('/_authenticated/sandbox')({
  component: SandboxPage,
});

/* ──────────────────────────────────────────────────────── */
/*  Reusable Section Wrapper                                */
/* ──────────────────────────────────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-xl border border-border bg-white/60 dark:bg-neutral-900/60 p-4 sm:p-6">
        {children}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/*  Main Sandbox Page                                       */
/* ──────────────────────────────────────────────────────── */
function SandboxPage() {
  const { t } = useTranslation('dashboard');
  const [progress, setProgress] = useState(45);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  return (
    <>
      <Header>
        <LanguageSwitcher />
        <ThemeToggle />
      </Header>
      <Main>
        <div className="space-y-12">
          {/* Page header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                {t('sandbox.badge')}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t('sandbox.title')}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {t('sandbox.subtitle')}
            </p>
          </div>

          <Separator />

          {/* ── BUTTONS ──────────────────────────────────────── */}
          <Section
            title="Buttons"
            description="Primary actions and interactions."
          >
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

          {/* ── BADGES ───────────────────────────────────────── */}
          <Section
            title="Badges"
            description="Small status indicators and labels."
          >
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                <Check className="h-3 w-3 mr-1" /> Success
              </Badge>
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                <AlertCircle className="h-3 w-3 mr-1" /> Warning
              </Badge>
            </div>
          </Section>

          {/* ── CARDS ────────────────────────────────────────── */}
          <Section
            title="Cards"
            description="Container components for grouping related content."
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow duration-300">
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
              <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
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
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle>Gradient</CardTitle>
                  <CardDescription>
                    A card with subtle gradient.
                  </CardDescription>
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

          {/* ── INPUTS & FORMS ───────────────────────────────── */}
          <Section
            title="Inputs & Forms"
            description="Form elements for capturing user input."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled</Label>
                  <Input
                    id="disabled"
                    type="text"
                    placeholder="Disabled input"
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Framework</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Section>

          {/* ── CHECKBOX, SWITCH, RADIO ──────────────────────── */}
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

          {/* ── SLIDER & PROGRESS ────────────────────────────── */}
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
                  <span className="text-xs text-muted-foreground">
                    {progress}%
                  </span>
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

          {/* ── TABS ─────────────────────────────────────────── */}
          <Section
            title="Tabs"
            description="Organize content into switchable panels."
          >
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="tab-name">Name</Label>
                  <Input id="tab-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tab-username">Username</Label>
                  <Input id="tab-username" defaultValue="@peduarte" />
                </div>
                <Button>Save changes</Button>
              </TabsContent>
              <TabsContent value="password" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
                <Button>Change password</Button>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Receive push notifications on your devices.
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Receive email when someone mentions you.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </TabsContent>
            </Tabs>
          </Section>

          {/* ── ACCORDION ────────────────────────────────────── */}
          <Section
            title="Accordion"
            description="Collapsible sections for organizing lengthy content."
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern and supports
                  keyboard navigation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match your design
                  system and can be customized using Tailwind CSS utilities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It uses CSS animations for smooth open and close
                  transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          {/* ── ALERTS ───────────────────────────────────────── */}
          <Section
            title="Alerts"
            description="Contextual feedback messages for user actions."
          >
            <div className="space-y-4">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the CLI.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* ── DIALOG & ALERT DIALOG ────────────────────────── */}
          <Section
            title="Dialogs & Overlays"
            description="Modal windows, sheets, popovers, and hover cards."
          >
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you are
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@peduarte" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <PanelLeft className="h-4 w-4 mr-2" />
                    Open Sheet
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Panel</SheetTitle>
                    <SheetDescription>
                      This is a side panel that slides in from the right.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                    </div>
                    <Button className="w-full">Submit</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          defaultValue="100%"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          defaultValue="25px"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@shadcn</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@shadcn</h4>
                      <p className="text-sm text-muted-foreground">
                        The React component library. Open source.
                      </p>
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </Section>

          {/* ── TOOLTIP ──────────────────────────────────────── */}
          <Section title="Tooltip" description="Informative popups on hover.">
            <TooltipProvider>
              <div className="flex flex-wrap gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Bold className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bold</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Italic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Italic</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Underline className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Underline</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </Section>

          {/* ── TOGGLE & TOGGLE GROUP ────────────────────────── */}
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

          {/* ── TABLE ────────────────────────────────────────── */}
          <Section
            title="Table"
            description="Structured data displayed in rows and columns."
          >
            <div className="overflow-x-auto -mx-2">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      invoice: 'INV001',
                      status: 'Paid',
                      method: 'Credit Card',
                      amount: '$250.00',
                    },
                    {
                      invoice: 'INV002',
                      status: 'Pending',
                      method: 'PayPal',
                      amount: '$150.00',
                    },
                    {
                      invoice: 'INV003',
                      status: 'Unpaid',
                      method: 'Bank Transfer',
                      amount: '$350.00',
                    },
                    {
                      invoice: 'INV004',
                      status: 'Paid',
                      method: 'Credit Card',
                      amount: '$450.00',
                    },
                    {
                      invoice: 'INV005',
                      status: 'Paid',
                      method: 'PayPal',
                      amount: '$550.00',
                    },
                  ].map((row) => (
                    <TableRow key={row.invoice}>
                      <TableCell className="font-medium">
                        {row.invoice}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            row.status === 'Paid'
                              ? 'default'
                              : row.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell className="text-right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>

          {/* ── AVATARS ──────────────────────────────────────── */}
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
                <AvatarFallback className="bg-amber-500 text-white text-xs">
                  XY
                </AvatarFallback>
              </Avatar>
              <div className="flex -space-x-3">
                {[
                  'bg-sky-500',
                  'bg-rose-500',
                  'bg-amber-500',
                  'bg-emerald-500',
                ].map((bg, i) => (
                  <Avatar
                    key={i}
                    className="h-10 w-10 border-2 border-background"
                  >
                    <AvatarFallback className={`${bg} text-white text-xs`}>
                      {String.fromCharCode(65 + i)}
                      {String.fromCharCode(66 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    +5
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </Section>

          {/* ── SKELETON ─────────────────────────────────────── */}
          <Section
            title="Skeleton"
            description="Placeholder loading states for content."
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[75%]" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-[125px] rounded-xl" />
                <Skeleton className="h-[125px] rounded-xl" />
                <Skeleton className="h-[125px] rounded-xl" />
              </div>
            </div>
          </Section>

          {/* ── SCROLL AREA ──────────────────────────────────── */}
          <Section
            title="Scroll Area"
            description="Custom scrollable containers with styled scrollbars."
          >
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              <div className="space-y-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Item {i + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Description for item {i + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Section>

          {/* ── SEPARATOR ────────────────────────────────────── */}
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

          {/* ── DESIGN SYSTEM TOKENS ─────────────────────────── */}
          <Section
            title="Design System Tokens"
            description="Color palette, spacing, and typography used across the design system."
          >
            <div className="space-y-8">
              {/* Colors */}
              <div>
                <h4 className="text-sm font-medium mb-4">Colors</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
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
                  ].map((color) => (
                    <div key={color.name} className="space-y-1.5">
                      <div
                        className={`h-12 rounded-lg ${color.className} shadow-sm`}
                      />
                      <p className="text-xs font-medium text-center">
                        {color.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Colors */}
              <div>
                <h4 className="text-sm font-medium mb-4">Chart Colors</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="flex-1 space-y-1.5">
                      <div
                        className={`h-12 rounded-lg bg-chart-${n} shadow-sm`}
                        style={{ backgroundColor: `var(--chart-${n})` }}
                      />
                      <p className="text-xs font-medium text-center">
                        Chart {n}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h4 className="text-sm font-medium mb-4">Typography Scale</h4>
                <div className="space-y-3 p-4 rounded-lg border">
                  <p className="text-4xl font-bold tracking-tight">
                    Heading 1 — 4xl Bold
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    Heading 2 — 3xl Bold
                  </p>
                  <p className="text-2xl font-semibold">
                    Heading 3 — 2xl Semibold
                  </p>
                  <p className="text-xl font-semibold">
                    Heading 4 — xl Semibold
                  </p>
                  <p className="text-lg font-medium">Large — lg Medium</p>
                  <p className="text-base">Body — base Regular</p>
                  <p className="text-sm text-muted-foreground">
                    Small — sm Muted
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Extra Small — xs Muted
                  </p>
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <h4 className="text-sm font-medium mb-4">Border Radius</h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'sm', className: 'rounded-sm' },
                    { name: 'md', className: 'rounded-md' },
                    { name: 'lg', className: 'rounded-lg' },
                    { name: 'xl', className: 'rounded-xl' },
                    { name: '2xl', className: 'rounded-2xl' },
                    { name: 'full', className: 'rounded-full' },
                  ].map((r) => (
                    <div key={r.name} className="space-y-1.5 text-center">
                      <div
                        className={`h-16 w-16 bg-primary/10 border-2 border-primary/30 ${r.className}`}
                      />
                      <p className="text-xs font-medium">{r.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <div className="text-center py-12 text-sm text-muted-foreground">
            <p>
              Built with{' '}
              <span className="font-medium text-foreground">shadcn/ui</span> +{' '}
              <span className="font-medium text-foreground">
                Tailwind CSS v4
              </span>
            </p>
            <p className="mt-1">Powered by Radix UI primitives</p>
          </div>
        </div>
      </Main>
    </>
  );
}

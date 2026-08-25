import { createFileRoute } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';
import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { Badge } from '@repo/ui/components/ui/badge';
import { Separator } from '@repo/ui/components/ui/separator';
import { AppHeader } from '../../components/layout/app-header';
import { Main } from '../../components/layout/main';
import {
  AccordionSection,
  AlertsSection,
  AvatarSection,
  BadgesSection,
  ButtonsSection,
  CardsSection,
  DesignTokensSection,
  DialogsSection,
  InputsSection,
  ScrollAreaSection,
  SelectionControlsSection,
  SeparatorSection,
  SkeletonSection,
  SliderProgressSection,
  TableSection,
  TabsSection,
  ToggleSection,
  TooltipSection,
} from '../../features/sandbox/sections';

export const Route = createFileRoute('/_authenticated/sandbox')({
  component: SandboxPage,
});

function SandboxPage() {
  const { t } = useTranslation('dashboard');

  return (
    <>
      <AppHeader
        extra={
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
        }
      />
      <Main>
        <div className="space-y-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="mr-1 h-3 w-3" />
                {t('sandbox.badge')}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t('sandbox.title')}
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t('sandbox.subtitle')}
            </p>
          </div>

          <Separator />

          <ButtonsSection />
          <BadgesSection />
          <CardsSection />
          <InputsSection />
          <SelectionControlsSection />
          <SliderProgressSection />
          <TabsSection />
          <AccordionSection />
          <AlertsSection />
          <DialogsSection />
          <TooltipSection />
          <ToggleSection />
          <TableSection />
          <AvatarSection />
          <SkeletonSection />
          <ScrollAreaSection />
          <SeparatorSection />
          <DesignTokensSection />

          <div className="py-12 text-center text-sm text-muted-foreground">
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

import { Settings2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Label } from '@repo/ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/ui/drawer';
import {
  useLayout,
  type Collapsible,
  type Variant,
} from '../context/layout-provider';
import {
  useFont,
  FONTS,
  DEFAULT_FONT,
  type Font,
} from '../context/font-provider';

// Matches ThemeProvider's defaultTheme prop in main.tsx.
const DEFAULT_THEME = 'dark';

function RadioRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={option.value}
              id={`${label}-${option.value}`}
            />
            <Label
              htmlFor={`${label}-${option.value}`}
              className="text-sm font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export function ConfigDrawer() {
  const { t } = useTranslation('dashboard');
  const { variant, setVariant, collapsible, setCollapsible, resetLayout } =
    useLayout();
  const { font, setFont } = useFont();
  const { theme, setTheme } = useTheme();

  const resetAll = () => {
    resetLayout();
    setTheme(DEFAULT_THEME);
    setFont(DEFAULT_FONT);
  };

  const variants: { value: Variant; label: string }[] = [
    { value: 'inset', label: t('configDrawer.variantInset') },
    { value: 'sidebar', label: t('configDrawer.variantSidebar') },
    { value: 'floating', label: t('configDrawer.variantFloating') },
  ];

  const collapsibleModes: { value: Collapsible; label: string }[] = [
    { value: 'offcanvas', label: t('configDrawer.collapsibleOffcanvas') },
    { value: 'icon', label: t('configDrawer.collapsibleIcon') },
    { value: 'none', label: t('configDrawer.collapsibleNone') },
  ];

  const fonts: { value: Font; label: string }[] = FONTS.map((f) => ({
    value: f,
    label: t(`configDrawer.font.${f}`),
  }));

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 />
          <span className="sr-only">{t('configDrawer.title')}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('configDrawer.title')}</DrawerTitle>
          <DrawerDescription>{t('configDrawer.description')}</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-6 overflow-y-auto px-4">
          <RadioRow
            label={t('configDrawer.sidebarVariant')}
            value={variant}
            onChange={(value) => setVariant(value as Variant)}
            options={variants}
          />
          <RadioRow
            label={t('configDrawer.sidebarCollapsible')}
            value={collapsible}
            onChange={(value) => setCollapsible(value as Collapsible)}
            options={collapsibleModes}
          />
          <RadioRow
            label={t('configDrawer.theme')}
            value={theme ?? 'system'}
            onChange={setTheme}
            options={[
              { value: 'light', label: t('commandMenu.lightTheme') },
              { value: 'dark', label: t('commandMenu.darkTheme') },
              { value: 'system', label: t('commandMenu.systemTheme') },
            ]}
          />
          <RadioRow
            label={t('configDrawer.font.label')}
            value={font}
            onChange={(value) => setFont(value as Font)}
            options={fonts}
          />
        </div>
        <DrawerFooter>
          <Button variant="outline" onClick={resetAll}>
            {t('configDrawer.reset')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

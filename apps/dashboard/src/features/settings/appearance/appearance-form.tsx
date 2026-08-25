import { useTheme } from 'next-themes';
import { useTranslation } from '@repo/i18n';
import { Label } from '@repo/ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { SelectDropdown } from '../../../components/select-dropdown';
import { FONTS, useFont } from '../../../context/font-provider';

export function AppearanceForm() {
  const { t } = useTranslation('dashboard');
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();

  const themeOptions = [
    { value: 'light', label: t('commandMenu.lightTheme') },
    { value: 'dark', label: t('commandMenu.darkTheme') },
    { value: 'system', label: t('commandMenu.systemTheme') },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Label>{t('configDrawer.theme')}</Label>
        <RadioGroup
          value={theme ?? 'system'}
          onValueChange={setTheme}
          className="flex flex-wrap gap-4"
        >
          {themeOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={option.value}
                id={`appearance-theme-${option.value}`}
              />
              <Label htmlFor={`appearance-theme-${option.value}`}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-3">
        <Label>{t('configDrawer.font.label')}</Label>
        <SelectDropdown
          value={font}
          onValueChange={(value) => setFont(value as (typeof FONTS)[number])}
          className="w-64"
          items={FONTS.map((f) => ({
            value: f,
            label: t(`configDrawer.font.${f}`),
          }))}
        />
      </div>
    </div>
  );
}

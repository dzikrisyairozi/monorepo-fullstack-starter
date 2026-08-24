import { useTranslation } from '@repo/i18n';

export function SkipToMain() {
  const { t } = useTranslation('dashboard');

  return (
    <a
      href="#content"
      className="fixed top-4 left-4 z-100 -translate-y-16 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
    >
      {t('layout.skipToMain')}
    </a>
  );
}

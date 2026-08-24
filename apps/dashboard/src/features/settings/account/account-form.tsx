import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  useTranslation,
  type SupportedLanguage,
} from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { DatePicker } from '../../../components/date-picker';
import { SelectDropdown } from '../../../components/select-dropdown';
import { showSubmittedData } from '../../../lib/show-submitted-data';

export function AccountForm() {
  const { t, i18n } = useTranslation('dashboard');

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameMinLength')),
        dob: z.date({ message: t('validation.dobRequired') }),
        language: z.enum(SUPPORTED_LANGUAGES, {
          message: t('validation.languageRequired'),
        }),
      }),
    [t],
  );

  const currentLanguage = i18n.language.split('-')[0];
  const defaultLanguage = (SUPPORTED_LANGUAGES as readonly string[]).includes(
    currentLanguage,
  )
    ? (currentLanguage as SupportedLanguage)
    : DEFAULT_LANGUAGE;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      dob: undefined,
      language: defaultLanguage,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          showSubmittedData(values, t('settings.account.title'));
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.account.name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('settings.account.dob')}</FormLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder={t('settings.account.dobPlaceholder')}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.account.language')}</FormLabel>
              <SelectDropdown
                value={field.value}
                onValueChange={field.onChange}
                placeholder={t('settings.account.language')}
                items={SUPPORTED_LANGUAGES.map((lang) => ({
                  label: LANGUAGE_LABELS[lang].label,
                  value: lang,
                }))}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('settings.account.update')}</Button>
      </form>
    </Form>
  );
}

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { showSubmittedData } from '../../../lib/show-submitted-data';

const SIDEBAR_SECTIONS = ['general', 'pages', 'other'] as const;

export function DisplayForm() {
  const { t } = useTranslation('dashboard');

  const schema = useMemo(
    () =>
      z.object({
        sections: z
          .array(z.enum(SIDEBAR_SECTIONS))
          .min(1, t('validation.sectionsRequired')),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { sections: [...SIDEBAR_SECTIONS] },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          showSubmittedData(values, t('settings.display.title'));
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="sections"
          render={() => (
            <FormItem>
              <div className="mb-3">
                <FormLabel>{t('settings.display.sections')}</FormLabel>
                <FormDescription>
                  {t('settings.display.sectionsDescription')}
                </FormDescription>
              </div>
              <div className="space-y-3">
                {SIDEBAR_SECTIONS.map((section) => (
                  <FormField
                    key={section}
                    control={form.control}
                    name="sections"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(section)}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked
                                  ? [...field.value, section]
                                  : field.value.filter(
                                      (value) => value !== section,
                                    ),
                              )
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t(`nav.groups.${section}`)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('settings.display.update')}</Button>
      </form>
    </Form>
  );
}

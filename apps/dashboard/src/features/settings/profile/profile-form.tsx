import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { showSubmittedData } from '../../../lib/show-submitted-data';

export function ProfileForm() {
  const { t } = useTranslation('dashboard');

  const schema = useMemo(
    () =>
      z.object({
        username: z.string().min(2, t('validation.usernameMinLength')),
        email: z
          .string()
          .min(1, t('validation.emailRequired'))
          .email(t('validation.emailInvalid')),
        bio: z.string().max(160, t('validation.bioMaxLength')).optional(),
        urls: z.array(
          z.object({
            value: z
              .string()
              .min(1, t('validation.urlRequired'))
              .url(t('validation.urlInvalid')),
          }),
        ),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
      urls: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'urls',
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          showSubmittedData(values, t('settings.profile.title'));
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.profile.username')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.profile.email')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.profile.bio')}</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                {t('settings.profile.bioDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`urls.${index}.value`}
              render={({ field: urlField }) => (
                <FormItem className="mb-3">
                  <FormLabel className={index !== 0 ? 'sr-only' : undefined}>
                    {t('settings.profile.urls')}
                  </FormLabel>
                  <FormDescription
                    className={index !== 0 ? 'sr-only' : undefined}
                  >
                    {t('settings.profile.urlsDescription')}
                  </FormDescription>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input {...urlField} placeholder="https://example.com" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <X />
                      <span className="sr-only">
                        {t('settings.profile.removeUrl')}
                      </span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ value: '' })}
          >
            <Plus />
            {t('settings.profile.addUrl')}
          </Button>
        </div>
        <Button type="submit">{t('settings.profile.update')}</Button>
      </form>
    </Form>
  );
}

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
} from '@repo/ui/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Separator } from '@repo/ui/components/ui/separator';
import { Switch } from '@repo/ui/components/ui/switch';
import { showSubmittedData } from '../../../lib/show-submitted-data';

const NOTIFICATION_TYPES = ['all', 'mentions', 'none'] as const;

export function NotificationsForm() {
  const { t } = useTranslation('dashboard');

  const schema = useMemo(
    () =>
      z.object({
        type: z.enum(NOTIFICATION_TYPES),
        communicationEmails: z.boolean(),
        marketingEmails: z.boolean(),
        socialEmails: z.boolean(),
        securityEmails: z.literal(true),
      }),
    [],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'all',
      communicationEmails: true,
      marketingEmails: false,
      socialEmails: true,
      securityEmails: true,
    },
  });

  const channels = [
    {
      name: 'communicationEmails' as const,
      label: t('settings.notifications.communicationEmails'),
      description: t('settings.notifications.communicationEmailsDescription'),
    },
    {
      name: 'marketingEmails' as const,
      label: t('settings.notifications.marketingEmails'),
      description: t('settings.notifications.marketingEmailsDescription'),
    },
    {
      name: 'socialEmails' as const,
      label: t('settings.notifications.socialEmails'),
      description: t('settings.notifications.socialEmailsDescription'),
    },
    {
      name: 'securityEmails' as const,
      label: t('settings.notifications.securityEmails'),
      description: t('settings.notifications.securityEmailsDescription'),
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          showSubmittedData(values, t('settings.notifications.title'));
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{t('settings.notifications.type')}</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-2"
              >
                {NOTIFICATION_TYPES.map((type) => (
                  <FormItem
                    key={type}
                    className="flex items-center gap-2 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={type} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t(`settings.notifications.types.${type}`)}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />
        <Separator />
        <div className="space-y-4">
          {channels.map((channel) => (
            <FormField
              key={channel.name}
              control={form.control}
              name={channel.name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{channel.label}</FormLabel>
                    <FormDescription>{channel.description}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={channel.name === 'securityEmails'}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">{t('settings.notifications.update')}</Button>
      </form>
    </Form>
  );
}

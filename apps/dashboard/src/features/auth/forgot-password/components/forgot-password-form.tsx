import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MailCheck } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';

type ForgotPasswordValues = {
  email: string;
};

export function ForgotPasswordForm() {
  const { t } = useTranslation('dashboard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const forgotPasswordSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t('validation.emailRequired'))
          .email(t('validation.emailInvalid')),
      }),
    [t],
  );

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values: ForgotPasswordValues) => {
    setIsSubmitting(true);
    // Mock submit - no network call, no email actually sent.
    setSubmittedEmail(values.email);
  };

  if (submittedEmail) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <MailCheck className="size-10 text-primary" />
        <p className="text-sm text-muted-foreground">
          {t('forgotPassword.successDescription', { email: submittedEmail })}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('signIn.email')}</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t('forgotPassword.submit')}
        </Button>
      </form>
    </Form>
  );
}

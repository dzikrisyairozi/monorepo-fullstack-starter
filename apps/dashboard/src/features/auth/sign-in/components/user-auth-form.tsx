import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { PasswordInput } from '../../../../components/password-input';
import { useAuthStore } from '../../../../stores/auth-store';

type SignInValues = {
  email: string;
  password: string;
};

export function UserAuthForm({ redirectTo }: { redirectTo?: string }) {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Built with t() in scope so validation messages are translated, not
  // raw i18n keys - FormMessage renders error.message verbatim.
  const signInSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t('validation.emailRequired'))
          .email(t('validation.emailInvalid')),
        password: z
          .string()
          .min(1, t('validation.passwordRequired'))
          .min(8, t('validation.passwordMinLength')),
      }),
    [t],
  );

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: SignInValues) => {
    setIsSubmitting(true);
    signIn({ name: 'Dzikri Syairozi', email: values.email }, 'mock_token');
    navigate({ to: redirectTo || '/' });
  };

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
                <Input placeholder={t('signIn.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('signIn.password')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t('signIn.submit')}
        </Button>
      </form>
    </Form>
  );
}

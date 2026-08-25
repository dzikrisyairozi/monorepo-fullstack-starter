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

type SignUpValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(1, t('validation.nameRequired')),
          email: z
            .string()
            .min(1, t('validation.emailRequired'))
            .email(t('validation.emailInvalid')),
          password: z
            .string()
            .min(1, t('validation.passwordRequired'))
            .min(8, t('validation.passwordMinLength')),
          confirmPassword: z.string().min(1, t('validation.passwordRequired')),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('validation.passwordsDoNotMatch'),
          path: ['confirmPassword'],
        }),
    [t],
  );

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = () => {
    setIsSubmitting(true);
    // Mock submit - no network call. This starter has no signup backend.
    navigate({ to: '/sign-in' });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('signUp.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('signUp.namePlaceholder')} {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('signUp.confirmPassword')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t('signUp.submit')}
        </Button>
      </form>
    </Form>
  );
}

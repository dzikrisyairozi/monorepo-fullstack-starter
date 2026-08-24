import { Link } from '@tanstack/react-router';
import { Activity, BarChart3, Box, CreditCard, Users } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { AppTitle } from '../../../components/layout/app-title';
import { UserAuthForm } from './components/user-auth-form';

const PREVIEW_STATS = [
  { icon: CreditCard, labelKey: 'index.totalRevenue', value: '$45,231.89' },
  { icon: Users, labelKey: 'index.subscriptions', value: '+2350' },
  { icon: BarChart3, labelKey: 'index.sales', value: '+12,234' },
  { icon: Activity, labelKey: 'index.activeNow', value: '+573' },
];

export function SignIn2({ redirectTo }: { redirectTo?: string }) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-orange-600 p-10 text-primary-foreground lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 flex items-center gap-2.5 font-semibold">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <Box className="size-5" />
          </div>
          <span className="text-lg tracking-tight">
            {t('nav.teams.starter')}
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {PREVIEW_STATS.map((stat) => (
            <Card
              key={stat.labelKey}
              className="border-white/20 bg-white/10 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary-foreground/80">
                  {t(stat.labelKey)}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary-foreground/80" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <blockquote className="relative z-10 space-y-2">
          <p className="text-lg">{t('signIn2.quote')}</p>
          <footer className="text-sm text-primary-foreground/80">
            {t('signIn2.quoteAuthor')}
          </footer>
        </blockquote>
      </div>

      <div className="flex flex-1 items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex justify-center lg:hidden">
            <AppTitle />
          </div>
          <div className="space-y-1.5 text-center">
            <h1 className="text-xl font-semibold tracking-tight">
              {t('signIn.title')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('signIn.description')}
            </p>
          </div>
          <UserAuthForm redirectTo={redirectTo} />
          <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
            <Link to="/forgot-password" className="hover:text-primary">
              {t('signIn.forgotPassword')}
            </Link>
            <p>
              {t('signIn.noAccount')}{' '}
              <Link
                to="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                {t('signIn.createAccount')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

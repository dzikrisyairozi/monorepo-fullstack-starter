import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  Users,
  CreditCard,
  Activity,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/components/ui/chart';
import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { Header } from '../../components/layout/header';
import { Main } from '../../components/layout/main';
import { ThemeSwitch } from '../../components/theme-switch';
import { ConfigDrawer } from '../../components/config-drawer';
import { Search } from '../../components/search';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const { t } = useTranslation('dashboard');

  const chartConfig = {
    desktop: {
      label: t('index.desktop'),
      color: 'var(--chart-1)',
    },
    mobile: {
      label: t('index.mobile'),
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;

  const stats = [
    {
      title: t('index.totalRevenue'),
      value: '$45,231.89',
      desc: t('index.revenueChange'),
      icon: CreditCard,
    },
    {
      title: t('index.subscriptions'),
      value: '+2350',
      desc: t('index.subscriptionsChange'),
      icon: Users,
    },
    {
      title: t('index.sales'),
      value: '+12,234',
      desc: t('index.salesChange'),
      icon: BarChart3,
    },
    {
      title: t('index.activeNow'),
      value: '+573',
      desc: t('index.activeChange'),
      icon: Activity,
    },
  ];

  return (
    <>
      <Header>
        <Search />
        <LanguageSwitcher />
        <ThemeSwitch />
        <ConfigDrawer />
      </Header>
      <Main>
        <div className="space-y-8">
          <div>
            <h2 className="mb-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {t('index.title')}
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {t('index.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="border-white/20 bg-white/60 transition-shadow duration-300 hover:shadow-lg dark:border-white/5 dark:bg-neutral-900/60"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="bg-white/60 transition-shadow hover:shadow-md lg:col-span-4 dark:bg-neutral-900/60">
              <CardHeader>
                <CardTitle>{t('index.chartOverview')}</CardTitle>
                <CardDescription>{t('index.chartDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] w-full pt-4 sm:h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-white/60 transition-shadow hover:shadow-md lg:col-span-3 dark:bg-neutral-900/60">
              <CardHeader>
                <CardTitle>{t('index.recentSales')}</CardTitle>
                <CardDescription>
                  {t('index.recentSalesDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        OM
                      </div>
                      <div className="ml-3 min-w-0 space-y-1 sm:ml-4">
                        <p className="truncate text-sm leading-none font-medium">
                          Olivia Martin
                        </p>
                        <p className="truncate text-xs text-muted-foreground sm:text-sm">
                          olivia.martin@email.com
                        </p>
                      </div>
                      <div className="ml-auto shrink-0 text-sm font-medium sm:text-base">
                        +$1,999.00
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-center p-8">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-8 shadow-lg transition-all hover:shadow-xl"
            >
              <Link to="/sandbox">
                {t('index.checkSandbox')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Main>
    </>
  );
}

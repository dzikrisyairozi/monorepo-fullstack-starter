import { Link } from '@tanstack/react-router';
import {
  Activity,
  ArrowRight,
  BarChart3,
  CreditCard,
  Users,
} from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/ui/tabs';
import { Analytics } from './components/analytics';
import { Overview } from './components/overview';
import { RecentSales } from './components/recent-sales';

export function Dashboard() {
  const { t } = useTranslation('dashboard');

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

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t('index.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="analytics">
            {t('index.tabs.analytics')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="bg-white/60 transition-shadow hover:shadow-md lg:col-span-4 dark:bg-neutral-900/60">
              <CardHeader>
                <CardTitle>{t('index.chartOverview')}</CardTitle>
                <CardDescription>{t('index.chartDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] w-full pt-4 sm:h-[300px]">
                <Overview />
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
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="bg-white/60 transition-shadow hover:shadow-md dark:bg-neutral-900/60">
            <CardHeader>
              <CardTitle>{t('index.analytics.title')}</CardTitle>
              <CardDescription>
                {t('index.analytics.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Analytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
  );
}

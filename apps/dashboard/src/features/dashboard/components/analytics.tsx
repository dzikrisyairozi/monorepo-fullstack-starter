import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useTranslation } from '@repo/i18n';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/components/ui/chart';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';

const chartData = [
  { month: 'January', sessions: 1420, pageviews: 3980 },
  { month: 'February', sessions: 1680, pageviews: 4310 },
  { month: 'March', sessions: 1540, pageviews: 4020 },
  { month: 'April', sessions: 1890, pageviews: 5120 },
  { month: 'May', sessions: 2210, pageviews: 5860 },
  { month: 'June', sessions: 2040, pageviews: 5490 },
];

export function Analytics() {
  const { t } = useTranslation('dashboard');

  const chartConfig = {
    sessions: {
      label: t('index.analytics.sessions'),
      color: 'var(--chart-1)',
    },
    pageviews: {
      label: t('index.analytics.pageviews'),
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;

  const stats = [
    { label: t('index.analytics.activeUsers'), value: '1,204' },
    { label: t('index.analytics.bounceRate'), value: '32.4%' },
    { label: t('index.analytics.avgSession'), value: '4m 12s' },
  ];

  return (
    <div className="space-y-6">
      <div className="h-[200px] w-full sm:h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart accessibilityLayer data={chartData}>
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
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="pageviews"
              type="monotone"
              fill="var(--color-pageviews)"
              fillOpacity={0.2}
              stroke="var(--color-pageviews)"
            />
            <Area
              dataKey="sessions"
              type="monotone"
              fill="var(--color-sessions)"
              fillOpacity={0.4}
              stroke="var(--color-sessions)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border-white/20 bg-white/60 dark:border-white/5 dark:bg-neutral-900/60"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

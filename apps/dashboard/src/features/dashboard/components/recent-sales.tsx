const sales = [
  {
    initials: 'OM',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    initials: 'JL',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
  },
  {
    initials: 'IN',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
  },
  {
    initials: 'WK',
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
  },
];

export function RecentSales() {
  return (
    <div className="space-y-6">
      {sales.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {sale.initials}
          </div>
          <div className="ml-3 min-w-0 space-y-1 sm:ml-4">
            <p className="truncate text-sm leading-none font-medium">
              {sale.name}
            </p>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">
              {sale.email}
            </p>
          </div>
          <div className="ml-auto shrink-0 text-sm font-medium sm:text-base">
            {sale.amount}
          </div>
        </div>
      ))}
    </div>
  );
}

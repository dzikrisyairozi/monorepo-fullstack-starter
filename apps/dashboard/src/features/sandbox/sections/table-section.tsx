import { Badge } from '@repo/ui/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import { Section } from '../section';

const INVOICES = [
  {
    invoice: 'INV001',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$250.00',
  },
  {
    invoice: 'INV002',
    status: 'Pending',
    method: 'PayPal',
    amount: '$150.00',
  },
  {
    invoice: 'INV003',
    status: 'Unpaid',
    method: 'Bank Transfer',
    amount: '$350.00',
  },
  {
    invoice: 'INV004',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$450.00',
  },
  {
    invoice: 'INV005',
    status: 'Paid',
    method: 'PayPal',
    amount: '$550.00',
  },
];

export function TableSection() {
  return (
    <Section
      title="Table"
      description="Structured data displayed in rows and columns."
    >
      <div className="-mx-2 overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((row) => (
              <TableRow key={row.invoice}>
                <TableCell className="font-medium">{row.invoice}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === 'Paid'
                        ? 'default'
                        : row.status === 'Pending'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}

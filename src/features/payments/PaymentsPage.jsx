import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Receipt,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { formatCurrency, formatDateTime } from '../../lib/formatters';
import { PageHeader } from '../../components/ui/PageHeader';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';

export function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      setIsLoading(true);
      try {
        const res = await apiRequest('/payments');
        setPayments(res?.data || []);
      } catch (err) {
        console.error('Failed to load payment transactions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPayments();
  }, []);

  const totalPaid = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

  return (
    <div className="container-custom py-8 sm:py-12 space-y-8">
      <PageHeader
        badge={
          <Badge variant="primary" size="sm">
            Billing & Invoices
          </Badge>
        }
        title="Payment & Billing History"
        description="Review all receipts, transaction records, and payment method authorisations."
      />

      {/* Summary Banner - clean single KPI */}
      {payments.length > 0 && (
        <div className="max-w-xs">
          <Card className="p-5 border-neutral-200/80">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Total Invoiced
            </span>
            <span className="text-2xl font-bold text-neutral-900 mt-1 block">
              {formatCurrency(totalPaid)}
            </span>
            <span className="text-xs text-neutral-500 mt-1 block">
              Across {payments.length} transaction{payments.length === 1 ? '' : 's'}
            </span>
          </Card>
        </div>
      )}

      {/* Payment Transactions Table / Card List */}
      {isLoading ? (
        <div className="space-y-3 min-h-[300px]">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      ) : payments.length === 0 ? (
        <div className="min-h-[380px] flex items-center justify-center">
          <EmptyState
            icon={Receipt}
            title="No payment records found"
            description="You haven't made any service transactions yet."
            actionLabel="Explore Services"
            onAction={() => window.location.assign('/services')}
          />
        </div>
      ) : (
        <Card className="border-neutral-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Transaction ID</th>
                  <th className="py-3.5 px-4">Booking</th>
                  <th className="py-3.5 px-4">Gateway Provider</th>
                  <th className="py-3.5 px-4">Processed Date</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-mono font-medium text-neutral-900">
                      {p.provider_payment_id || `txn_${p.id}`}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        to={`/bookings/${p.booking_id}`}
                        className="text-teal-700 hover:text-teal-900 font-bold"
                      >
                        #{p.booking_id}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-neutral-600 capitalize">
                      {p.provider?.replace(/_/g, ' ')}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">
                      {formatDateTime(p.created_at)}
                    </td>
                    <td className="py-4 px-4 font-bold text-neutral-900 text-sm">
                      {formatCurrency(p.amount, p.currency)}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={p.status === 'succeeded' ? 'success' : 'neutral'}
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <Link to={`/bookings/${p.booking_id}`}>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Receipt
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

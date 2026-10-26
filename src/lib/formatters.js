export function formatCurrency(amount, currency = 'INR') {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatDuration(minutes) {
  if (!minutes) return '45 mins';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
  if (hrs > 0) return `${hrs} hr`;
  return `${mins} min`;
}

export function getStatusBadgeVariant(status) {
  switch (status?.toLowerCase()) {
    case 'confirmed':
    case 'succeeded':
    case 'active':
    case 'completed':
      return { variant: 'success', label: status.toUpperCase() };
    case 'pending':
    case 'in_progress':
      return { variant: 'warning', label: status.replace('_', ' ').toUpperCase() };
    case 'cancelled':
    case 'failed':
      return { variant: 'danger', label: status.toUpperCase() };
    case 'not_started':
    default:
      return { variant: 'neutral', label: (status || 'UNKNOWN').toUpperCase() };
  }
}

import { Installment } from '@/store/financeStore';

type InstallmentWithMeta = Installment & {
  due_day?: number | null;
  last_paid_date?: string | null;
  next_payment_date?: string | null;
};

export type InstallmentStatus = 'completed' | 'overdue' | 'active';

const monthIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth();

const parseLocalDate = (value: string) => new Date(`${value}T12:00:00`);

export function isInstallmentPaidInMonth(inst: Installment, referenceDate = new Date()): boolean {
  const lastPaid = (inst as InstallmentWithMeta).last_paid_date;
  if (!lastPaid) return false;

  const paidDate = parseLocalDate(lastPaid);
  return (
    paidDate.getFullYear() === referenceDate.getFullYear() &&
    paidDate.getMonth() === referenceDate.getMonth()
  );
}

export function getInstallmentStatus(inst: Installment, referenceDate = new Date()): InstallmentStatus {
  if (inst.paid_installments >= inst.total_installments || !inst.is_active) return 'completed';

  if (isInstallmentPaidInMonth(inst, referenceDate)) return 'active';

  const normalizedReference = new Date(referenceDate);
  normalizedReference.setHours(0, 0, 0, 0);

  const { due_day: dueDay, next_payment_date: nextDate } = inst as InstallmentWithMeta;

  if (nextDate) {
    const due = parseLocalDate(nextDate);
    const dueMonth = monthIndex(due);
    const currentMonth = monthIndex(normalizedReference);

    if (dueMonth > currentMonth) return 'active';
    return normalizedReference > due ? 'overdue' : 'active';
  }

  if (dueDay) {
    const startDate = parseLocalDate(inst.start_date);
    const monthsElapsed =
      (normalizedReference.getFullYear() - startDate.getFullYear()) * 12 +
      (normalizedReference.getMonth() - startDate.getMonth());
    const expectedPaid = Math.min(
      monthsElapsed + (normalizedReference.getDate() >= dueDay ? 1 : 0),
      inst.total_installments,
    );

    if (inst.paid_installments < expectedPaid) return 'overdue';
  }

  return 'active';
}
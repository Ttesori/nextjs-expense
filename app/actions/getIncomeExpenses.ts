'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getIncomeExpenses(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) {
    return { error: 'No user found' };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });
    const amounts = transactions.map((transaction) => transaction.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((sum, item) => sum + item);
    const expense = amounts
      .filter((item) => item < 0)
      .reduce((sum, item) => sum + item);
    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getIncomeExpenses;

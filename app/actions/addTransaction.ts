'use server';
import { auth } from '@clerk/nextjs/server';

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get('text');
  const amtValue = formData.get('amount');

  if (!textValue || textValue === '' || !amtValue) {
    return { error: 'Text or amount is missing' };
  }

  const text: string = textValue.toString(); // Ensure text is string
  const amount: number = parseFloat(amtValue.toString()); // Parse amount as number

  // Get logged in user
  const { userId } = await auth();

  // Check for user
  if (!userId) {
    return { error: 'User not found' };
  }

  const transactionData: TransactionData = {
    text,
    amount,
  };
  return { data: transactionData };
}

export default addTransaction;
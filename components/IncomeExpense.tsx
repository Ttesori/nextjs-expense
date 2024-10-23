import getIncomeExpenses from '@/app/actions/getIncomeExpenses';
import { addCommas } from '@/lib/utils';

const IncomeExpense = async () => {
  const { income, expense, error } = await getIncomeExpenses();
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{addCommas(income ?? 0)}</p>
      </div>
      <div>
        <h4>Expenses</h4>
        <p className="money minus">{addCommas(expense ?? 0)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;

import { useEffect, useState } from 'react';
import { type ITransaction } from '../components/Transaction';
import { useTransactionContext } from '../transactions-context-provider';

const sumTransactionAmounts = (array: ITransaction[]) =>
  array
    .map((element) => Number(element.amount))
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

export const useBalance = () => {
  const { getAllTransactions } = useTransactionContext();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const countBalance = async () => {
      const transactions = await getAllTransactions();
      const sum = sumTransactionAmounts(transactions);
      setBalance(sum);
    };

    countBalance();
  }, []);

  return { balance };
};

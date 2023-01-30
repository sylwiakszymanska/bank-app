import React, { type FC } from 'react';

import { Transaction } from './Transaction';
import { useTransactionContext } from '../transactions-context-provider';
import { InfiniteScroll } from './InfiniteScroll';

export const Transactions: FC = () => {
  const { transactions, deleteTransaction, nextPage, filterMode } = useTransactionContext();

  return (
    <div data-test-id="transactions-list">
      {transactions?.map((transaction) => (
        <Transaction
          key={transaction.id}
          data={transaction}
          onDelete={(id) => {
            deleteTransaction(id);
          }}
        />
      ))}
      <InfiniteScroll isActive={transactions.length > 19 && !filterMode} onBottomReach={nextPage} />
    </div>
  );
};

import { type ITransaction } from '../components/Transaction';

export const getTransactions = async (page?: number) =>
  await fetch(
    `http://localhost:3000/transactions${
      typeof page !== 'undefined' ? `?_page=${page}&_limit=20` : ''
    }`
  ).then(async (response) => await response.json());

export const submitTransaction = async (data: ITransaction) => {
  await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => await response.json());
};

export const removeTransaction = async (id: number) => {
  await fetch(`http://localhost:3000/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => await response.json());
};

export const filterTransactionByBeneficiary = async (name: string) =>
  await fetch(`http://localhost:3000/transactions?beneficiary_like=${name}`).then(
    async (response) => await response.json()
  );

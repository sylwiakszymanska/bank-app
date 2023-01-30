import { useSnackbar } from 'notistack';
import { createContext, type FC, useContext, useEffect, useState, useMemo } from 'react';
import {
  filterTransactionByBeneficiary,
  getTransactions,
  removeTransaction,
  submitTransaction,
} from './api/transactions';
import { type ITransaction } from './components/Transaction';

interface IProps {
  children: React.ReactNode;
}

interface ContextProps {
  transactions: ITransaction[];
  deleteTransaction: (id: number) => void;
  addTransaction: (data: ITransaction) => void;
  nextPage: () => void;
  getAllTransactions: () => Promise<ITransaction[]>;
  filterTransactions: (name: string) => Promise<ITransaction[]>;
  filterMode: boolean;
}

const defaultState: ContextProps = {
  transactions: [],
  deleteTransaction: () => null,
  addTransaction: () => null,
  nextPage: () => null,
  getAllTransactions: async () => await Promise.resolve([]),
  filterTransactions: async () => await Promise.resolve([]),
  filterMode: false,
};

const TransactionsProvider: FC<IProps> = ({ children }) => {
  const [transactions, setTransactions] = useState([] as ITransaction[]);
  const [page, setPage] = useState(1);
  const [filterMode, setFilterMode] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const initialFetch = () => {
    void getTransactions(page).then((response) => {
      setTransactions(response);
    });
  };

  useEffect(() => {
    initialFetch();
  }, []);

  const mergeTransactions = (content: ITransaction[]) => {
    setTransactions(transactions.concat(content));
  };

  const nextPage = () => {
    setPage(page + 1);
    void getTransactions(page + 1).then((response) => {
      mergeTransactions(response);
    });
  };

  const deleteTransaction = (id: number) => {
    removeTransaction(id)
      .then(async () => {
        await getTransactions(page).then((r) => {
          enqueueSnackbar('Successfully deleted', { variant: 'success' });
          setTransactions(r);
        });
      })
      .catch((error: string) => {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
      });
  };

  const addTransaction = (data: ITransaction) => {
    void submitTransaction(data)
      .then(async (data) => {
        enqueueSnackbar('Successfully added transaction', { variant: 'success' });
        await getTransactions(page).then((r) => {
          setTransactions(r);
        });
      })
      .catch((error: string) => {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
      });
  };

  const getAllTransactions = async () => {
    const response = await getTransactions().then((r) => r);
    return response;
  };

  const filterTransactions = async (name: string) => {
    if (name.length !== 0) {
      setFilterMode(true);
      const response = await filterTransactionByBeneficiary(name).then((r) => r);
      setTransactions(response);
    } else {
      setFilterMode(false);
      setPage(1);
      void getTransactions(page).then((response) => {
        setTransactions(response);
      });
    }

    return [];
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        getAllTransactions,
        deleteTransaction,
        addTransaction,
        nextPage,
        filterTransactions,
        filterMode,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const TransactionsContext = createContext(defaultState);
const useTransactionContext = () => useContext(TransactionsContext);

export { TransactionsProvider, useTransactionContext };

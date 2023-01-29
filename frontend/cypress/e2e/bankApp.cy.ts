import { type ITransaction } from '../../src/components/Transaction';
import allTransactionsRaw from '../fixtures/transactions_all.json';

const allTransactions = allTransactionsRaw as ITransaction[];
console.log({ allTransactions });
const getByDataTestId = (dataTestId: string) => cy.get(`[data-test-id="${dataTestId}"]`);

describe('Bank app integration tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('http://localhost:3001/');
    cy.intercept('/transactions?_page=1&_limit=20', { fixture: 'transactions_page1' });
    cy.intercept('/transactions', { fixture: 'transactions_all' });
  });

  it('Should be able to see full list of transactions correctly and load new transactions on scroll', () => {
    getByDataTestId('transactions-list')
      .should('be.visible')
      .should('have.length', 1)
      .within(() => {
        getByDataTestId('transaction').should('be.visible').should('have.length', 20);
      });

    // checking infinite scroll
    getByDataTestId('transaction').last().scrollIntoView();

    cy.intercept('/transactions?_page=2&_limit=20', { fixture: 'transactions_page2' });
    getByDataTestId('transaction').should('be.visible').should('have.length', 22);
  });

  it('Should be able to add new transaction', () => {
    getByDataTestId('transaction-form').should('be.visible').should('have.length', 1);

    const newTransactionData: ITransaction = {
      id: Date.now(),
      amount: 10000,
      beneficiary: 'Dolores Conway',
      account: 'PL1010323761001215',
      address: '63 Hendrickson Place, Thomasville, Ohio',
      date: new Date().toISOString(),
      description: 'Hello there',
    };

    // checking the balance before adding new transactions
    getByDataTestId('balance-amount').should('contain.text', '-7672.03 PLN');

    // creating the new transaction
    getByDataTestId('input-amount')
      .should('have.value', '')
      .type(newTransactionData.amount.toString());
    getByDataTestId('input-beneficiary')
      .should('have.value', '')
      .type(newTransactionData.beneficiary);
    getByDataTestId('input-account').should('have.value', '').type(newTransactionData.account);
    getByDataTestId('input-address').should('have.value', '').type(newTransactionData.address);
    getByDataTestId('input-description')
      .should('have.value', '')
      .type(newTransactionData.description);
    // submitting form
    getByDataTestId('submit-form-button').should('be.visible').click();

    cy.intercept('POST', 'transactions');
    cy.intercept('GET', '/transactions?_page=1&_limit=20', { fixture: 'transactions_page1' });
    cy.intercept('GET', '/transactions', [...allTransactions, newTransactionData]);
    // checking snackbar notification
    cy.get('#notistack-snackbar')
      .should('be.visible')
      .should('contain.text', 'Successfully added transaction');

    cy.get('#notistack-snackbar').should('not.exist');

    // checking balance amount
    getByDataTestId('balance-amount').should('contain.text', '2327.97 PLN');
  });

  it.skip('Should be able to delete transaction', () => {});
  it.skip('Should be able to filter transactions by benefitiary', () => {});
});

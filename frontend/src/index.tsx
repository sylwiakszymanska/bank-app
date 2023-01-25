import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TransactionsProvider } from './transactions-context-provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      maxSnack={3}
      autoHideDuration={3000}>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </SnackbarProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

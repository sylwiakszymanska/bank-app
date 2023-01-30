import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Navbar } from './components/Navbar';
import { Balance } from './components/Balance';
import { TransactionForm } from './components/TransactionsForm';
import { Transactions } from './components/Transactions';
import { Filter } from './components/Filter';
import { Footer } from './components/Footer';

interface IProps {
  isVisible: boolean;
}

const StyledContainer = styled.div`
  padding-bottom: 32px;
  position: relative;
  min-height: calc(100vh - 32px);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  width: 98%;
  margin: 50px auto;
  justify-content: space-between;

  @media (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;

  @media (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Backdrop = styled.div<IProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;

  ${({ isVisible }) =>
    isVisible &&
    `
    visibility: visible;
    opacity: 1;
    transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  `};
`;

const Loader = styled.img`
  position: absolute;
  left: 50%;
  top: 40%;
`;

function App() {
  const [isLoaderVisible, setLoaderVisible] = useState(false);

  return (
    <StyledContainer>
      <Backdrop isVisible={isLoaderVisible}>
        <Loader
          src="https://emojipedia-us.s3.amazonaws.com/source/noto-emoji-animations/344/money-with-wings_1f4b8.gif"
          width="120"
          height="120"></Loader>
      </Backdrop>
      <Navbar title="Bank App" />
      <Row>
        <Column>
          <Balance />
          <Filter />
        </Column>
        <TransactionForm />
      </Row>
      <Row>
        <Transactions />
      </Row>
      <Footer />
    </StyledContainer>
  );
}

export default App;

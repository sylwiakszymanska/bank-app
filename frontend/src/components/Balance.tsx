import React, { type FC } from 'react';
import styled from '@emotion/styled';
import { useBalance } from '../hooks/use-balance';

const StyledBalance = styled.div`
  border: 1px solid #f2f3f4;
  width: 500px;
  max-width: 98%;
  padding: 10px 40px;
  background: #ffffff;
  box-shadow: 5px 5px 5px rgb(68 68 68 / 10%);
  color: #565252;
  box-sizing: border-box;
`;

const StyledTitle = styled.p`
  font-size: 1.8rem;
`;

const Amount = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.8;
  margin: 0 0 28px;
`;

export const Balance: FC = () => {
  const { balance } = useBalance();

  return (
    <StyledBalance>
      <StyledTitle>Balance:</StyledTitle>
      <Amount data-test-id="balance-amount">{`${balance.toFixed(2)} PLN`}</Amount>
    </StyledBalance>
  );
};

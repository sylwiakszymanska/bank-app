import React, { type FC, type ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { useTransactionContext } from '../transactions-context-provider';

const StyledFilter = styled.div`
  border: 1px solid #f2f3f4;
  background: #ffffff;
  box-shadow: 5px 5px 5px rgb(68 68 68 / 10%);
  width: 500px;
  max-width: 98%;
  box-sizing: border-box;

  input {
    padding: 1rem 3rem;
  }

  @media (max-width: 1050px) {
    margin: 20px;
  }
`;

export const Filter: FC = () => {
  const { filterTransactions } = useTransactionContext();

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const response = filterTransactions(value);
  };

  return (
    <StyledFilter>
      <input onChange={handleFilterChange} placeholder="Filter" />
    </StyledFilter>
  );
};

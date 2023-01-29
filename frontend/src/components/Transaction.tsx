import React, { type FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  data: ITransaction;
  onDelete: (id: number) => void;
}

const StyledTransaction = styled.div`
  border: 1px solid #f2f3f4;
  background-color: #f5f5f5;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-bottom: 10px;
  box-shadow: 5px 5px 5px rgb(68 68 68 / 10%);

  @media (max-width: 1050px) {
    display: block;
  }
`;

const Date = styled.p`
  grid-area: 1 / 1 / 2 / 2;
`;

const Beneficiary = styled.p`
  grid-area: 2 / 1 / 3 / 2;
  font-size: 1.5rem;
`;

const Address = styled.p`
  grid-area: 3 / 1 / 4 / 2;
  color: grey;
`;

const Description = styled.p`
  grid-area: 1 / 2 / 3 / 3;
`;

const Account = styled.p`
  grid-area: 3 / 2 / 3 / 3;
  color: grey;
`;

const Amount = styled.div`
  grid-area: 1 / 3 / 4 / 4;
  text-align: center;
`;

const Delete = styled.p`
  grid-area: 1 / 4 / 4 / 5;
  text-align: end;
`;

const StyledButton = styled.button`
  background-color: lightgrey;
  color: white;
  cursor: pointer;
  text-align: center;
  padding: 1rem;
`;

const GreenText = styled.p`
  color: #2ecc71;
`;

const RedText = styled.p`
  color: #e74c3c;
`;

export interface ITransaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  address: string;
  account: string;
  beneficiary: string;
}

const formatDate = (date: string) => {
  return date.split('T')[0];
};
const colorAmount = (amount: number) => {
  return amount > 0 ? <GreenText>{amount}</GreenText> : <RedText>{amount}</RedText>;
};

export const Transaction: FC<IProps> = ({ data, onDelete }) => {
  return (
    <StyledTransaction data-test-id="transaction">
      <Date>{formatDate(data.date)}</Date>
      <Beneficiary>{data.beneficiary}</Beneficiary>
      <Address>{data.address}</Address>
      <Description>{data.description}</Description>
      <Account>{data.account}</Account>
      <Amount>{colorAmount(data.amount)}</Amount>
      <Delete>
        <StyledButton
          onClick={(event) => {
            event.preventDefault();
            onDelete(data.id);
          }}>
          Delete
        </StyledButton>
      </Delete>
    </StyledTransaction>
  );
};

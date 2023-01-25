import React, { type FC, useState } from 'react';
import styled from '@emotion/styled';

import { Input } from './Input';
import { useTransactionContext } from '../transactions-context-provider';

interface IErrors {
  amount?: string;
  beneficiary?: string;
  account?: string;
  address?: string;
  description?: string;
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 98%;
  background: #ffffff;
  box-shadow: 5px 5px 5px rgb(68 68 68 / 10%);

  input {
    padding: 1rem 3rem;
  }
`;

const StyledButton = styled.button`
  background-color: lightgrey;
  color: white;
  cursor: pointer;
  text-align: center;
  padding: 1rem;
`;

export const TransactionForm: FC = () => {
  const { addTransaction } = useTransactionContext();

  const initialValue = {
    amount: '',
    account: '',
    beneficiary: '',
    address: '',
    description: '',
  };

  const initialErrors = {
    amount: '',
    beneficiary: '',
    account: '',
    address: '',
    description: '',
  };

  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValue);

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    setErrors(initialErrors);
    const newErrors: IErrors = {};
    if (values.amount.length === 0) {
      newErrors.amount = 'Amount is required';
    } else if (Number(values.amount) <= 0) {
      newErrors.amount = 'Amount must be positive';
    }
    if (values.beneficiary.length === 0) {
      newErrors.beneficiary = 'Beneficiary is required';
    }
    if (values.account.length === 0) {
      newErrors.account = 'Account is required';
    }
    if (values.address.length === 0) {
      newErrors.address = 'Address is required';
    }
    if (values.description.length === 0) {
      newErrors.description = 'Description is required';
    }
    setErrors({ ...initialErrors, ...newErrors });

    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setValues(initialValue);
  };

  const submitForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      addTransaction({
        ...values,
        amount: Number(values.amount),
        date: new Date().toISOString(),
        id: Date.now().toString(),
      });
      clearForm();
    }
  };

  return (
    <StyledForm>
      <Input
        name="amount"
        placeholder="Amount"
        errorMessage={errors.amount}
        value={values.amount}
        onChange={handleChange}
        onBlur={validateForm}
      />
      <Input
        name="beneficiary"
        placeholder="Beneficiary"
        errorMessage={errors.beneficiary}
        value={values.beneficiary}
        onChange={handleChange}
        onBlur={validateForm}
      />
      <Input
        name="account"
        placeholder="Account number"
        errorMessage={errors.account}
        value={values.account}
        onChange={handleChange}
        onBlur={validateForm}
      />
      <Input
        name="address"
        placeholder="Address"
        errorMessage={errors.address}
        value={values.address}
        onChange={handleChange}
        onBlur={validateForm}
      />
      <Input
        name="description"
        placeholder="Description"
        errorMessage={errors.description}
        value={values.description}
        onChange={handleChange}
        onBlur={validateForm}
      />
      <StyledButton
        type="button"
        onClick={(event) => {
          submitForm(event);
        }}>
        Submit
      </StyledButton>
    </StyledForm>
  );
};

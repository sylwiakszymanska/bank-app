import React, { type ChangeEvent, type FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  errorMessage: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
  onBlur: () => void;
}

const StyledInput = styled.div`
  width: 100%;
  border: 1px solid #f2f3f4;

  input {
    padding: 1rem 3rem;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
  padding: 0 3rem;
  margin: 0;
`;

export const Input: FC<IProps> = ({ errorMessage, value, name, placeholder, onChange, onBlur,  }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(name, value);
  };

  return (
    <StyledInput>
      <input placeholder={placeholder} value={value} onChange={handleChange} onBlur={onBlur} />
      <Error>{errorMessage}</Error>
    </StyledInput>
  );
};

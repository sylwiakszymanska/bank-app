import React, { type FC } from 'react';
import styled from '@emotion/styled';

const StyledNavbar = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #cbd6e3;
  text-align: center;
  box-shadow: 5px 5px 5px rgb(68 68 68 / 10%);
`;

const StyledTitle = styled.div`
  padding: 1rem;
  font-size: 3rem;
  color: #565252;
`;

interface IProps {
  title?: string;
}

export const Navbar: FC<IProps> = ({ title }) => {
  return (
    <StyledNavbar>
      <StyledTitle>{title}</StyledTitle>
    </StyledNavbar>
  );
};

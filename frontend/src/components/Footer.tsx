import React, { type FC } from 'react';
import styled from '@emotion/styled';

const StyledFooter = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #cbd6e3;
  text-align: center;
  padding-top: 1rem;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

const StyledText = styled.p`
  margin: 0;
`;

export const Footer: FC = () => {
  return (
    <StyledFooter>
      <StyledText>Footer</StyledText>
    </StyledFooter>
  );
};

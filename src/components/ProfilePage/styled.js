import { memo } from 'react';
import styled from 'styled-components';

import InputBase from '../ui/inputs/Input/Input';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Input = styled(InputBase)`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 0.8rem;

  > input {
    align-self: flex-start;
  }

  &:nth-child(odd) {
    background-color: var(--backgroundQuarternary);
  }
  &:nth-child(even) {
    background-color: var(--backgroundPrimary);
  }
`;

export const FormControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 0.8rem;
`;

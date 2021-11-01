import styled from 'styled-components';

import { Button } from '../ui/inputs/Button/styled';
import { ListItem } from '../ui/display/List/styled';

export const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

export const CreateCommunity = styled(Button)`
  margin-top: 1.6rem;
  font-size: 1rem;
`;

export const LeaveOutCommunity = styled(Button)`
  font-size: 1.6rem;
  padding: 0.3rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d6875;
  gap: 0.6rem;
  margin-right: 0.6rem;
`;

export const Badge = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: var(--backgroundQuarternary);
  color: black;
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  top: -0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const ListItemCommunity = styled(ListItem)`
  margin-bottom: 0;
  position: relative;

  &:nth-child(even) {
    background-color: var(--backgroundPrimary);
  }
  &:nth-child(odd) {
    background-color: var(--backgroundQuarternary);
  }
`;

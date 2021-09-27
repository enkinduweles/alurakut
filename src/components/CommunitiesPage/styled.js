import styled from 'styled-components';

import { Button } from '../UI/inputs/Button/styled';
import { ListItem } from '../UI/display/List/styled';

export const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

export const CreateCommunity = styled(Button)`
  margin-top: 1.6rem;
  font-size: 1rem;
`;

export const Item = styled(ListItem)`
  margin-bottom: 0;

  &:nth-child(even) {
    background-color: var(--backgroundPrimary);
  }
  &:nth-child(odd) {
    background-color: var(--backgroundQuarternary);
  }
`;

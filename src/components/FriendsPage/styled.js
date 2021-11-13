import styled from 'styled-components';

import { Button } from '../ui/inputs/Button/styled';
import { ListItem } from '../ui/display/List/styled';

export const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

export const AddFriend = styled(Button)`
  margin-top: 1.6rem;
  font-size: 1rem;
`;

export const ListItemFriend = styled(ListItem)`
  margin-bottom: 0;
  position: relative;

  &:nth-child(even) {
    background-color: var(--backgroundPrimary);
  }
  &:nth-child(odd) {
    background-color: var(--backgroundQuarternary);
  }
`;

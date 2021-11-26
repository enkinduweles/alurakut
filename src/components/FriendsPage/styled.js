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

  figure {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    img {
      border-radius: 10px;
    }
  }

  &:nth-child(even) {
    background-color: var(--backgroundPrimary);
  }
  &:nth-child(odd) {
    background-color: var(--backgroundQuarternary);
  }
`;

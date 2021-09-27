import styled from 'styled-components';
import { ListItem } from '../UI/display/List/styled';
import Link from '../UI/Navigation/Link/Link';

export const NavigationItem = styled(ListItem)`
  padding: 0;
  font-size: 1.2rem;

  > a {
    display: flex;
    align-items: center;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UsernameLink = styled(Link)`
  font-weight: bold;
  font-size: 1.6rem;
  margin-top: 1.2rem;
  display: inline-block;
`;

export const IconWrapper = styled.div`
  margin-right: 0.8rem;
`;

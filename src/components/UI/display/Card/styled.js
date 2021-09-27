import styled from 'styled-components';

import { Box } from '../../layout/Box/styled';
import Link from '../../Navigation/Link/Link';

export const CardWrapper = styled.div`
  display: flex;
`;

export const CardContent = styled(Box)`
  background-color: inherit;
  padding: 0 1.2rem;
`;
export const TitleWrapper = styled(Box)`
  background-color: inherit;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  > svg {
    font-size: 1.8rem;
    cursor: pointer;

    &:hover {
      color: #f368e0;
    }
  }
`;

export const Body = styled.p`
  width: 80%;
  font-size: 1.4rem;
  color: #555;
`;

export const CardTitle = styled(Link)`
  font-size: 1.6rem;
`;

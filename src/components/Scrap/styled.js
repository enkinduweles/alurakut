import styled from 'styled-components';
import { Box } from '../ui/layout/Box/styled';

export const MessageWrapper = styled(Box)`
  background-color: inherit;
  padding: 0 1.2rem;
`;
export const HeaderWrapper = styled(Box)`
  background-color: inherit;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  > svg {
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      color: #f368e0;
    }
  }
`;

export const Message = styled.p`
  width: 80%;
  font-size: 1.6rem;
`;

export const Username = styled.h2`
  font-size: 1.8rem;
`;

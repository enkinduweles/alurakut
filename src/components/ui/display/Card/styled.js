import styled from 'styled-components';

import { Box } from '../../layout/Box/styled';
import Link from '../../navigation/Link/Link';
import Input from '../../inputs/Input/Input';

export const Checkbox = styled(Input)`
  width: auto;
  align-self: center;
  z-index: 101;
  display: flex;
  justify-content: center;
  > input {
    box-shadow: none;
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 2rem 8rem 1fr;
  grid-gap: 1.6rem;
  width: 100%;
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

export const CardContent = styled(Box)`
  background-color: inherit;
  padding: 0;
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

import styled from 'styled-components';
import { Button } from '../ui/inputs/Button/styled';

export const Separator = styled.span`
  color: #999;
  margin: 0 0.4rem;
`;

export const ControlButton = styled(Button)`
  font-size: 1rem;
  padding: 0;
  @media (min-width: 860px) {
    font-size: 1.1rem;
  }
`;

export const ControlsWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;

  @media (min-width: 860px) {
    justify-content: flex-end;
  }
`;
export const PageCountWrapper = styled.div`
  margin: 1.6rem 0 0.8rem 0;
`;

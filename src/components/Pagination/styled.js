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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

// export const CounterWrapper = styled.div`

//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 0.8rem;
// `;

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const DeleteItem = styled(Button)`
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
  z-index: 1;
`;

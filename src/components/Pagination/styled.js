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

export const ButtonWrapper = styled.button`
  position: relative;
  border: 0;
  outline: none;
  background-color: transparent;
`;

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 0.5rem;
`;

export const Badge = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--backgroundQuarternary);
  color: black;
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

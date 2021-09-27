import styled, { css } from 'styled-components';

const textAreaType = css`
  resize: none;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  outline: none;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
`;

export const InputBase = styled.input`
  ${({ as }) => {
    return as === 'textarea' ? textAreaType : null;
  }}
  width: inherit;
  font-size: 1.5rem;
  padding: 0.8rem;
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 8px;
  background: white;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  &:disabled {
    background-color: transparent;
    box-shadow: none;
  }

  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    border-bottom: 3px solid #f368e0;
  }
`;

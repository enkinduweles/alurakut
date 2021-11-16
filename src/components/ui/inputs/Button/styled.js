import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 0.6rem 1.6rem;
  text-align: center;
  background-color: ${({ outline }) =>
    outline ? 'transparent' : 'var(--colorPrimary)'};
  color: ${({ outline }) => (outline ? 'var(--textPrimaryColor)' : 'white')};
  border: none;
  outline: none;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 0.02857rem;
`;

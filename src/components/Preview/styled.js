import styled from 'styled-components';

import { Form } from '../ui/layout/Form/styled';
import { Button } from '../ui/inputs/Button/styled';

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Username = styled.p`
  font-size: 1.6rem;
  color: var(--colorPrimary);
  margin-top: 0.8rem;
`;

export const WarningMessage = styled.p`
  color: #c338b3;

  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.8rem;
`;

export const SearchForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const SearchButton = styled(Button)`
  align-self: flex-end;
  margin-top: 1.6rem;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

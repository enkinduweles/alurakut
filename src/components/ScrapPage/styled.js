import styled from 'styled-components';

import { ListItem } from '../ui/display/List/styled';
import { Button } from '../ui/inputs/Button/styled';
import { Form } from '../ui/layout/Form/styled';

export const ScrapListItem = styled(ListItem)`
  display: flex;
  &:nth-child(even) {
    background-color: var(--backgroundPrimary);
  }

  &:nth-child(odd) {
    background-color: var(--backgroundQuarternary);
  }
`;

export const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.8rem;
`;

export const SubmitButton = styled(Button)`
  align-self: flex-end;
  margin-top: 0.8rem;
`;

export const ScrapBox = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
`;

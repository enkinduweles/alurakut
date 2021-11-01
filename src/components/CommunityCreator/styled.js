import styled from 'styled-components';

import { Form } from '../ui/layout/Form/styled';
import { Button } from '../ui/inputs/Button/styled';

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PreviewPickedImage = styled.div`
  width: 100%;
  height: 15rem;
  align-self: center;
  ${({ hasImage }) => (!hasImage ? 'background-color: #ced4da' : null)};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FileInputWrapper = styled.label`
  cursor: pointer;
  font-size: 1.2rem;
  text-transform: uppercase;
  text-align: center;
  padding: 0.3rem 1.2rem;
  background-color: var(--colorPrimary);
  color: white;
  border: none;
  outline: none;
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  > svg {
    font-size: 2.4rem;
    align-self: flex-end;
    margin-left: 0.8rem;
  }

  input[type='file'] {
    display: none;
  }
`;

export const WarningMessage = styled.p`
  color: #c338b3;

  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.8rem;
`;

export const RegisterCommunityForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 0 4.5rem;

  > div {
    margin-bottom: 2rem;
  }

  > div:nth-last-child(2) {
    margin-bottom: 0;
  }
`;

export const CreateCommunity = styled(Button)`
  align-self: flex-end;
  margin-top: 1.6rem;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

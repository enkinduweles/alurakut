import styled from 'styled-components';

import { Form } from '../ui/layout/Form/styled';
import { Button } from '../ui/inputs/Button/styled';
import Input from '../ui/inputs/Input/Input';

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PreviewPickedImage = styled.figure`
  width: 100%;
  height: 18rem;
  position: relative;
  ${({ showImage }) => (!showImage ? 'background-color: #ced4da' : null)};
  margin-bottom: 1rem;

  > span {
    font-size: 1.4rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;

export const FileInput = styled(Input)`
  > input {
    font-size: 1.2rem;
    border-radius: 0;
    box-shadow: none;
  }
`;
export const FileInputWrapper = styled.div`
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  width: 100%;
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
  padding: 0;

  @media (min-width: 768px) {
    padding: 0 4.5rem;
  }

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
export const PreviewButton = styled(Button)`
  padding: 0.3rem 0.8rem;
  border-radius: 0;

  > svg {
    font-size: 1.6rem;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

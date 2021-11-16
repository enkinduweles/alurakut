import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: -9999px;
  height: 100vh;
  width: 100%;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.4);
  transition: left 0.1s ease-in-out;
  left: ${({ isTransitionActived }) => (isTransitionActived ? '0' : null)};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > button {
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    border-radius: 0;
    background-color: darkred;
  }
`;

export const ModalContent = styled.div`
  padding: 4rem 2rem 2rem 2rem;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 85%;
  background-color: white;
  z-index: 201;
  display: inline-block;

  @media (min-width: 500px) {
    width: 65%;
  }
  @media (min-width: 860px) {
    width: 60%;
    max-width: 55rem;
  }
`;

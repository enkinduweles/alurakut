import styled from 'styled-components';

export const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: -9999px;
  height: 100vh;
  width: 100%;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.4);
  transition: left 0.1s ease-in-out;
  left: ${({ isTransitionActived }) => (isTransitionActived ? '0' : null)};

  @media (min-width: 860px) {
    display: none;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > button {
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    border-radius: 0;
  }
`;

export const DrawerContent = styled.div`
  padding: 4rem 1.2rem;
  position: relative;

  width: 60%;
  background-color: white;
  z-index: 201;
  display: inline-block;
  height: 100vh;
  transition: all 3s ease-in-out;
`;

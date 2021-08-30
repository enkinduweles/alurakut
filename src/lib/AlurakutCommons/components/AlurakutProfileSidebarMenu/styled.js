import styled from 'styled-components';

export const AlurakutMenuProfileSidebarWrapper = styled.div`
  background: white;
  position: fixed;
  z-index: 100;
  padding: 23px;
  bottom: 0;
  left: 0;
  right: 0;
  top: 48px;
  transition: 0.3s;
  pointer-events: ${({ isMenuOpened }) => (isMenuOpened ? 'all' : 'none')};
  opacity: ${({ isMenuOpened }) => (isMenuOpened ? '1' : '0')};
  transform: ${({ isMenuOpened }) =>
    isMenuOpened ? 'translateY(0)' : 'translateY(calc(-100% - 48px))'};
  overflow: auto;

  @media (min-width: 860px) {
    display: none;
  }

  > div {
    max-width: 400px;
    margin: auto;

    figure {
      text-align: center;
      position: relative;

      img {
        display: inline-block;
      }
    }
  }

  a {
    font-size: 18px;
  }

  .boxLink {
    font-size: 18px;
    color: #2e7bb4;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-weight: 800;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }
`;

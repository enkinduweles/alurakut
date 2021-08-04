import styled from 'styled-components';

const GRID_TYPE = {
  profile: {
    templateArea: "'profileArea mainArea'",
  },
};

export const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;

  display: ${({ isMenuOpened }) => (isMenuOpened ? 'none' : 'initial')};

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  @media (min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: ${(props) => {
      return props.type === 'profile'
        ? GRID_TYPE.profile.templateArea
        : "'profileArea welcomeArea profileRelationsArea'";
    }};
    grid-template-columns: ${(props) => {
      return props.type === 'profile' ? '160px 1fr' : '160px 1fr 312px;';
    }};
  }
`;

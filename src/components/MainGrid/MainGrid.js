import styled from 'styled-components';
import PropTypes from 'prop-types';

const defineTypeGrid = (type) => {
  switch (type) {
    case 'profile':
      return {
        templateArea: "'profileArea mainArea'",
        columnsSize: '160px 1fr',
      };
    case 'scrap':
      return {
        templateArea: "'profileArea mainArea mainArea'",
        columnsSize: '160px 1fr 1fr',
      };
    default:
      return {
        templateArea: "'profileArea welcomeArea profileRelationsArea'",
        columnsSize: '160px 1fr 312px',
      };
  }
};

const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
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
      return defineTypeGrid(props.type).templateArea;
    }};
    grid-template-columns: ${(props) => {
      return defineTypeGrid(props.type).columnsSize;
    }};
  }
`;

MainGrid.propTypes = {
  isMenuOpened: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

export default MainGrid;

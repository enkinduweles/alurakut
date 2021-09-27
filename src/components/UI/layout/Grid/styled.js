import { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const defineTypeGrid = (type) => {
  switch (type) {
    case 'home':
      return {
        templateArea: "'profileArea mainArea profileRelationsArea'",
        columnsSize: '160px 1fr 312px',
      };
    default:
      return {
        templateArea: "'profileArea mainArea mainArea'",
        columnsSize: '160px 1fr 1fr',
      };
  }
};

export const Grid = styled.main`
  width: 100%;
  grid-gap: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 60rem;
  padding: 1.6rem;

  /* display: ${({ isMenuOpened }) => (isMenuOpened ? 'none' : null)}; */

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  @media (min-width: 860px) {
    max-width: 111rem;
    display: grid;
    grid-template-areas: ${(props) => {
      return defineTypeGrid(props.type).templateArea;
    }};
    grid-template-columns: ${(props) => {
      return defineTypeGrid(props.type).columnsSize;
    }};
  }
`;

export const GridItem = memo(styled.div`
  display: ${({ templateArea }) =>
    templateArea === 'profileArea' ? 'none' : 'block'};
  @media (min-width: 860px) {
    grid-area: ${({ templateArea }) => templateArea};
    display: block;
  }
`);

Grid.propTypes = {
  isMenuOpened: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

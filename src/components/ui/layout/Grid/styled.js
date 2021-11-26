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
    case 'login':
      return {
        templateArea:
          "'logoArea logoArea mainArea' 'footerArea footerArea footerArea'",
        columnsSize: '1fr 1fr 1fr',
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
  margin: 0 auto;
  max-width: 35rem;
  padding: 1.6rem;

  @media (min-width: 425px) {
    max-width: 48rem;
  }

  @media (min-width: 860px) {
    display: grid;
    grid-gap: 0.8rem;

    max-width: 111rem;
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
  isMenuOpened: PropTypes.bool,
  type: PropTypes.string,
};

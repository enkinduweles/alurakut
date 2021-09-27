import styled from 'styled-components';

import Link from '../UI/Navigation/Link/Link';

const BreadcrumbWrapper = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;

  svg {
    font-size: 1.2rem;
    vertical-align: middle;
    margin: 0 0.4rem;
  }
`;

const Crumb = styled(Link).attrs((props) => {
  return { active: props.active ? '#f368e0' : '#999' };
})`
  color: ${(props) => props.active};
  text-decoration: none;
  text-transform: uppercase;
`;

export { BreadcrumbWrapper, Crumb };

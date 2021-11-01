import styled from 'styled-components';

import Link from '../ui/navigation/Link/Link';

export const BreadcrumbWrapper = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;

  svg {
    font-size: 1.2rem;
    vertical-align: middle;
    margin: 0 0.4rem;
  }
`;

export const Crumb = styled(Link).attrs((props) => {
  return { active: props.active ? '#f368e0' : '#999' };
})`
  color: ${(props) => props.active};
  text-decoration: none;
  text-transform: uppercase;
`;

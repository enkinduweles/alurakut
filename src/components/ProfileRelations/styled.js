import styled from 'styled-components';

import LinkBase from '../ui/navigation/Link/Link';
import NoContentMessage from '../NoContentMessage/NoContentMessage';
import { List, ListItem } from '../ui/display/List/styled';

export const ProfileList = styled(List)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(min-content, 13rem));
  justify-content: space-between;
  padding: 0 1rem;
`;

export const ProfileListItem = styled(ListItem)`
  padding: 0;
  margin: 0;
`;

export const ItemLink = styled(LinkBase)`
  display: inline-block;
  height: 8.5rem;
  text-align: center;
  /* width: 100%; */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background-image: linear-gradient(0deg, #00000073, transparent);
  }
`;

export const SeeAll = styled(LinkBase)`
  margin-top: 1rem;
  display: inline-block;
  width: 100%;
  text-align: right;
  font-size: 1.6rem;
  padding-right: 1rem;
  font-weight: bold;
`;

export const Label = styled.span`
  color: #fff;
  z-index: 2;
  margin-top: 0.6rem;
  display: inline-block;
  font-size: 10px;
  position: absolute;
  left: 0;
  bottom: 10px;

  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Header = styled.h2`
  font-size: 1.6rem;
  padding-left: 0.8rem;
  margin-bottom: 2rem;
`;

export const Message = styled(NoContentMessage)`
  font-size: 1.2rem;
`;

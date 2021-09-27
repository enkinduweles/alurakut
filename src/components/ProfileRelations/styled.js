import styled from 'styled-components';
import { List, ListItem } from '../UI/display/List/styled';
import LinkBase from '../UI/Navigation/Link/Link';

export const ProfileList = styled(List)`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
  max-height: 220px;
`;

export const Link = styled(LinkBase)`
  display: inline-block;
  height: 102px;
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

export const Label = styled.label`
  color: #ffffff;
  font-size: 10px;
  position: absolute;
  left: 0;
  bottom: 10px;
  z-index: 2;
  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ImageWrapper = styled.figure`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Header = styled.h3`
  font-size: 1.8rem;
`;

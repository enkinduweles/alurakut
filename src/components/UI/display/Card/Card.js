import React from 'react';
import { MdDelete } from 'react-icons/md';
import Avatar from '../Avatar/AvatarBase';

import {
  CardWrapper,
  CardTitle,
  CardContent,
  TitleWrapper,
  Body,
} from './styled';

const Card = ({ title, bodyContent, href, src, layout, width, height }) => {
  return (
    <CardWrapper>
      <Avatar src={src} layout={layout} width={width} height={height} />
      <CardContent>
        <TitleWrapper>
          <CardTitle href="/">{title}</CardTitle>
        </TitleWrapper>
        <Body>{bodyContent}</Body>
      </CardContent>
    </CardWrapper>
  );
};

export default Card;

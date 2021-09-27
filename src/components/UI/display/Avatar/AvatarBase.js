import React from 'react';
import NextImage from 'next/image';
import defaultAvatar from '../../../../../public/default_avatar.png';

import { Figure } from './styled';

const AvatarBase = ({ src, ...props }) => {
  const { width, height } = props;

  return (
    <Figure width={width} height={height}>
      <NextImage src={src ? src : defaultAvatar} {...props} />
    </Figure>
  );
};

export default AvatarBase;

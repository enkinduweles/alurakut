import React from 'react';
import NextImage from 'next/image';
import defaultAvatar from '../../../../../public/default_avatar.svg';
import defaultImage from '../../../../../public/default_image.svg';

import { Figure } from './styled';

const Avatar = ({ src, type, round, ...props }) => {
  const { width, height } = props;

  return (
    <Figure width={width} height={height} round={round}>
      <NextImage
        src={src ? src : type === 'avatar' ? defaultAvatar : defaultImage}
        {...props}
      />
    </Figure>
  );
};

export default Avatar;

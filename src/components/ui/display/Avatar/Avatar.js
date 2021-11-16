import React from 'react';
import NextImage from '../../../NextImage/NextImage';
import defaultAvatar from '../../../../../public/default_avatar.svg';

const Avatar = ({ src, width, height, round }) => {
  return (
    <NextImage
      width={width}
      height={height}
      round={round}
      src={src ? src : defaultAvatar}
      layout="fill"
      priority
    />
  );
};

export default Avatar;

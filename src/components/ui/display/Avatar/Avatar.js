import React from 'react';
import NextImage from '../../../NextImage/NextImage';

const Avatar = ({ src, width, height, round }) => {
  return (
    <NextImage
      width={width}
      height={height}
      round={round}
      src={src}
      layout="fill"
      priority
    />
  );
};

export default Avatar;

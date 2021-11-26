import Image from 'next/image';

import { WrapperImage } from './styled';

const NextImage = ({ round, width, height, alt, ...props }) => {
  return (
    <WrapperImage round={round} width={width} height={height}>
      <Image
        layout="fill"
        priority
        {...props}
        alt={alt ? alt : ''}
        objectFit="fill"
      />
    </WrapperImage>
  );
};

export default NextImage;

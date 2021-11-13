import Image from 'next/image';

import { WrapperImage } from './styled';

const NextImage = ({ round, width, height, ...props }) => {
  return (
    <WrapperImage round={round} width={width} height={height}>
      <Image layout="fill" priority {...props} />
    </WrapperImage>
  );
};

export default NextImage;

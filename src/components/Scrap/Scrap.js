import React from 'react';
import { MdDelete } from 'react-icons/md';
import Avatar from '../ui/display/Avatar/Avatar';

import { MessageWrapper, HeaderWrapper, Message, Username } from './styled';

const Scrap = ({
  author,
  message,
  src,
  layout,
  width,
  height,
  onDeleteScrap,
}) => {
  return (
    <>
      <Avatar src={src} layout={layout} width={width} height={height} />
      <MessageWrapper>
        <HeaderWrapper>
          <Username>{author}</Username>
          <MdDelete onClick={onDeleteScrap} />
        </HeaderWrapper>
        <Message>{message}</Message>
      </MessageWrapper>
    </>
  );
};

export default Scrap;

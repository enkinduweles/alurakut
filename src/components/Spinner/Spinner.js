import { memo } from 'react';
import { Wrapper } from './styled';

export const Spinner = memo(() => {
  return (
    <Wrapper>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </Wrapper>
  );
});

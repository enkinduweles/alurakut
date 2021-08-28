import { memo } from 'react';
import { Wrapper } from './styled';

const Spinner = () => {
  return (
    <Wrapper>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </Wrapper>
  );
};

export default memo(Spinner);

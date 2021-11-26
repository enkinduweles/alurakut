import { Divider } from '../ui/display/Divider/styled';

import { Paragraph } from './styled';

const NoContentMessage = ({ children, withDivider, className }) => {
  return (
    <>
      {withDivider && <Divider />}

      <Paragraph className={className}>{children}</Paragraph>
    </>
  );
};

export default NoContentMessage;

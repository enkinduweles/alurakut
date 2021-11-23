import { Divider } from '../ui/display/Divider/styled';

import { Paragraph } from './styled';

const NoContentMessage = ({ children }) => {
  return (
    <div>
      <Divider />
      <Paragraph>{children}</Paragraph>
    </div>
  );
};

export default NoContentMessage;

import NextLink from 'next/link';

import { Anchor } from './styled';

const Link = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Anchor {...props}>{children}</Anchor>
    </NextLink>
  );
};

export default Link;

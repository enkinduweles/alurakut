import NextLink from 'next/link';

export const Link = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

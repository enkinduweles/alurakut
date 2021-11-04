import React from 'react';
import Image from 'next/image';
import Link from '../ui/navigation/Link/Link';
import Avatar from '../ui/display/Avatar/Avatar';
import { List } from '../ui/display/List/styled';
import { Box } from '../ui/layout/Box/styled';
import { Divider } from '../ui/display/Divider/styled';

import {
  NavigationItem,
  IconWrapper,
  UsernameLink,
  UserWrapper,
} from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';

const Sidebar = ({
  userName,
  id,
  layout,
  width,
  height,
  src,
  className,
  slug,
}) => {
  return (
    <Box className={className}>
      <UserWrapper>
        <Avatar
          layout={layout}
          alt={userName}
          width={width}
          height={height}
          src={src}
        />
        <UsernameLink href={`https://github.com/${userName}`}>
          @{userName}
        </UsernameLink>
      </UserWrapper>
      <Divider as="hr" />
      <nav>
        <List>
          <NavigationItem>
            <Link href={`/profile/${userName}?id=${id}`}>
              <IconWrapper>
                <Image
                  layout="intrinsic"
                  src={`${BASE_URL}/icons/user.svg`}
                  alt=""
                  width={15}
                  height={15}
                />
              </IconWrapper>
              Perfil
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href={`/scraps/${userName}?userId=${id}&slug=${slug}`}>
              <IconWrapper>
                <Image
                  layout="intrinsic"
                  src={`${BASE_URL}/icons/book.svg`}
                  alt=""
                  width={15}
                  height={15}
                />
              </IconWrapper>
              Recados
            </Link>
          </NavigationItem>

          <NavigationItem>
            <Link href="/">
              <IconWrapper>
                <Image
                  layout="intrinsic"
                  src={`${BASE_URL}/icons/camera.svg`}
                  alt=""
                  width={15}
                  height={15}
                />
              </IconWrapper>
              Fotos
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/">
              <IconWrapper>
                <Image
                  layout="intrinsic"
                  src={`${BASE_URL}/icons/sun.svg`}
                  alt=""
                  width={15}
                  height={15}
                />
              </IconWrapper>
              Depoimentos
            </Link>
          </NavigationItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;

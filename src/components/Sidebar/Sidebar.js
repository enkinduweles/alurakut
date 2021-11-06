import React from 'react';
import Image from 'next/image';
import Link from '../ui/navigation/Link/Link';
import Avatar from '../ui/display/Avatar/Avatar';
import { List } from '../ui/display/List/styled';
import { Box } from '../ui/layout/Box/styled';
import { Divider } from '../ui/display/Divider/styled';

import friendsIcon from '.././../../public/friends_icon.svg';
import communityIcon from '.././../../public/community_icon.svg';

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
            <Link href={`/scraps/${userName}?userId=${id}`}>
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
          <NavigationItem>
            <Link href={`/friends/${userName}?userId=${id}`}>
              <IconWrapper>
                <Image
                  layout="intrinsic"
                  src={friendsIcon}
                  alt=""
                  width={15}
                  height={15}
                />
              </IconWrapper>
              Amigos
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href={`/communities/${userName}?userId=${id}`}>
              <IconWrapper>
                <Image
                  layout="intrinsic"
                  src={communityIcon}
                  alt=""
                  width={15}
                  height={15}
                />
              </IconWrapper>
              Comunidades
            </Link>
          </NavigationItem>
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;

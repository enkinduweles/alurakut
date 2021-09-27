import React from 'react';
import Image from 'next/image';
import Link from '../UI/Navigation/Link/Link';
import Avatar from '../UI/display/Avatar/AvatarBase';
import { List, ListItem } from '../UI/display/List/styled';
import { Box } from '../UI/layout/Box/styled';
import { Divider } from '../UI/display/Divider/styled';

import {
  NavigationItem,
  IconWrapper,
  UsernameLink,
  UserWrapper,
} from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';

const Sidebar = ({ githubUser, id, layout, width, height, src, className }) => {
  return (
    <Box className={className}>
      <UserWrapper>
        <Avatar
          layout={layout}
          src={src}
          alt={githubUser}
          width={width}
          height={height}
          src={src}
        />
        <UsernameLink href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </UsernameLink>
      </UserWrapper>
      <Divider as="hr" />
      <nav>
        <List>
          <NavigationItem>
            <Link href={`/profile/${githubUser}?id=${id}`}>
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
            <Link href={`/scrap/${githubUser}?id=${id}`}>
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

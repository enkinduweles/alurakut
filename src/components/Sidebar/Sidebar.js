import React from 'react';
import { useRouter } from 'next/router';
import Link from '../ui/navigation/Link/Link';
import Avatar from '../ui/display/Avatar/Avatar';
import { List } from '../ui/display/List/styled';
import { Box } from '../ui/layout/Box/styled';
import { Divider } from '../ui/display/Divider/styled';
import NextImage from '../NextImage/NextImage';

import friendsIcon from '../../../public/friends_icon.svg';
import communityIcon from '../../../public/community_icon.svg';
import cameraIcon from '../../../public/camera_icon.svg';
import noteIcon from '../../../public/note_icon.svg';

import {
  NavigationItem,
  IconWrapper,
  UsernameLink,
  UserWrapper,
} from './styled';

const BASE_URL = 'http://alurakut.vercel.app/';

const Sidebar = ({ userName, id, width, height, src, className }) => {
  const router = useRouter();
  const logout = async () => {
    await axios.post('/api/logout');
    router.replace('/login');
  };
  return (
    <Box className={className}>
      <UserWrapper>
        <Avatar alt={userName} src={src} width={width} height={height} />
        <UsernameLink href={`https://github.com/${userName}`}>
          @{userName}
        </UsernameLink>
      </UserWrapper>
      <Divider as="hr" />
      <nav>
        <List>
          <NavigationItem>
            <Link href={`/profile/${userName}?userId=${id}`}>
              <IconWrapper>
                <NextImage
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
                <NextImage src={noteIcon} alt="" width={15} height={15} />
              </IconWrapper>
              Recados
            </Link>
          </NavigationItem>

          <NavigationItem>
            <Link href="/">
              <IconWrapper>
                <NextImage src={cameraIcon} alt="" width={15} height={15} />
              </IconWrapper>
              Fotos
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/">
              <IconWrapper>
                <NextImage
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
                <NextImage src={friendsIcon} alt="" width={15} height={15} />
              </IconWrapper>
              Amigos
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href={`/communities/${userName}?userId=${id}`}>
              <IconWrapper>
                <NextImage src={communityIcon} alt="" width={15} height={15} />
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

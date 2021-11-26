import { FaSadCry } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Drawer from '../src/components/ui/navigation/Drawer/Drawer';
import Link from '../src/components/ui/navigation/Link/Link';
import ProfileRelations from '../src/components/ProfileRelations/ProfileRelations';
import Sidebar from '../src/components/Sidebar/Sidebar';
import Spinner from '../src/components/Spinner/Spinner';
import { Box } from '../src/components/ui/layout/Box/styled';
import { Divider } from '../src/components/ui/display/Divider/styled';
import { Grid, GridItem } from '../src/components/ui/layout/Grid/styled';
import NoContentMessage from '../src/components/NoContentMessage/NoContentMessage';
import { UserMenu } from '../src/components/UserMenu/styled';

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

import rootPath from '../src/utils/apiPaths';
import { useDatoCMS } from '../src/hooks/useDatoCMS';
import { usePageOperations } from '../src/hooks/usePageOperations';
import { validateToken } from '../src/utils/auth';

const Home = ({ githubName, githubId, userId }) => {
  const {
    getData,
    data: datoContent,
    updateData,
    isFirstLoading,
    error,
  } = useDatoCMS();

  const { onShowMenu, isMenuOpened } = usePageOperations();

  useEffect(() => {
    getData({
      content: 'home',
      queryParams: {
        userId,
      },
    });
  }, [getData, userId]);

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        userName={githubName}
        showMenu={onShowMenu}
        id={userId}
      />
      {isMenuOpened && (
        <Drawer showMenu={onShowMenu} isMenuOpened={isMenuOpened}>
          <UserMenu
            userName={githubName}
            id={userId}
            width={50}
            height={50}
            src={datoContent.avatar}
          />
        </Drawer>
      )}
      {!isFirstLoading ? (
        <Grid type="home" isMenuOpened={isMenuOpened}>
          <GridItem templateArea="profileArea">
            <Sidebar
              userName={githubName}
              id={userId}
              width={130}
              height={130}
              src={datoContent.avatar}
            />
          </GridItem>
          <GridItem templateArea="mainArea">
            <Box>
              <h2>Bem vindo, {githubName}</h2>
              {/* <Divider /> */}
              <OrkutNostalgicIconSet
                userName={githubName}
                id={userId}
                scraps={datoContent.counters.totalScraps}
              />
            </Box>
          </GridItem>
          <GridItem templateArea="profileRelationsArea">
            <Box>
              {datoContent && datoContent.friends.length !== 0 ? (
                <ProfileRelations
                  title="Amigos"
                  data={datoContent.friends}
                  type="avatar"
                  total={datoContent.counters.totalFriends}
                  rootPath={rootPath.friend.page}
                  userName={githubName}
                  userId={userId}
                />
              ) : (
                <NoContentMessage>
                  Clique{' '}
                  <Link href={`/${rootPath.friend.page}/userId=${userId}`}>
                    aqui
                  </Link>{' '}
                  para adicionar um amigo
                </NoContentMessage>
              )}
            </Box>
            <Box>
              {datoContent && datoContent.communities.length !== 0 ? (
                <ProfileRelations
                  title="Comunidades"
                  data={datoContent.communities}
                  total={datoContent.counters.totalCommunities}
                  rootPath={rootPath.community.page}
                  userName={githubName}
                  userId={userId}
                  type="community"
                />
              ) : (
                <NoContentMessage>
                  Clique{' '}
                  <Link href={`/${rootPath.community.page}/userId=${userId}`}>
                    aqui
                  </Link>{' '}
                  para criar ou participar de uma comunidade
                </NoContentMessage>
              )}
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <Spinner />
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { isAuthorized, githubName, userId, githubId } = validateToken(
    context.req.headers.cookie
  );

  if (!isAuthorized) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubName,
      userId,
      githubId,
    },
  };
}

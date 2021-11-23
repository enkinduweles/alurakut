import { FaSadCry } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Drawer from '../src/components/ui/navigation/Drawer/Drawer';
import ProfileRelations from '../src/components/ProfileRelations/ProfileRelations';
import Sidebar from '../src/components/Sidebar/Sidebar';
import Spinner from '../src/components/Spinner/Spinner';
import { Box } from '../src/components/ui/layout/Box/styled';
import { Divider } from '../src/components/ui/display/Divider/styled';
import { Grid, GridItem } from '../src/components/ui/layout/Grid/styled';
import { NoContentMessage } from '../src/components/NoContentMessage/styled';
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

  const changePersonalityStatusHandler = (name, value) => {
    if (datoContent.personalityStatus[name] === value) {
      return;
    }

    updateData({
      content: 'home',
      queryParams: {
        userId,
      },
      body: { personalityName: name, value },
    });
  };

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
              <h1 className="title">Bem vindo, {githubName}</h1>
              <Divider />
              <OrkutNostalgicIconSet
                userName={githubName}
                id={userId}
                scraps={datoContent.counters.totalScraps}
                reliable={datoContent.personalityStatus.reliable}
                sexy={datoContent.personalityStatus.sexy}
                nice={datoContent.personalityStatus.nice}
                onChangePersonalityStatus={changePersonalityStatusHandler}
              />
            </Box>
          </GridItem>
          <GridItem templateArea="profileRelationsArea">
            <Box>
              {datoContent && datoContent.friends.length !== 0 ? (
                <ProfileRelations
                  title="Friends"
                  data={datoContent.friends}
                  type="avatar"
                  destination="friends"
                  total={datoContent.counters.totalFriends}
                  rootPath={rootPath.friend.page}
                  userName={githubName}
                  userId={userId}
                />
              ) : (
                <NoContentMessage>
                  <FaSadCry /> you didn&apos;t add friends yet
                </NoContentMessage>
              )}
            </Box>
            <Box>
              {datoContent && datoContent.friends.length !== 0 ? (
                <ProfileRelations
                  title="Communities"
                  data={datoContent.communities}
                  destination="communities"
                  total={datoContent.counters.totalCommunities}
                  rootPath={rootPath.community.page}
                  userName={githubName}
                  userId={userId}
                  type="community"
                />
              ) : (
                <NoContentMessage>
                  <FaSadCry /> no communities yet
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

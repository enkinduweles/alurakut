import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { FaSadCry } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';

import { Box } from '../src/components/ui/layout/Box/styled';
import { Grid, GridItem } from '../src/components/ui/layout/Grid/styled';
import { Divider } from '../src/components/ui/display/Divider/styled';
import Drawer from '../src/components/ui/navigation/Drawer/Drawer';
import Sidebar from '../src/components/Sidebar/Sidebar';
import { NoContentMessage } from '../src/components/NoContentMessage/styled';
import { UserMenu } from '../src/components/UserMenu/styled';

import ProfileRelations from '../src/components/ProfileRelations/ProfileRelations';

import Spinner from '../src/components/Spinner/Spinner';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

import { validateToken } from '../src/utils/auth';
import { useDatoCMS } from '../src/hooks/useDatoCMS';

const Home = ({ loggedInUserName, loggedInUserId, loggedInUserSlug }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const router = useRouter();

  const {
    getData,
    data: datoContent,
    updateData,
    isFirstLoading,
  } = useDatoCMS();
  console.log(datoContent);

  useEffect(() => {
    getData({
      content: 'home',
      queryParams: {
        userId: loggedInUserId,
        slug: loggedInUserSlug,
      },
    });
  }, [getData, loggedInUserId, loggedInUserSlug]);

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  const changePersonalityStatusHandler = (name, value) => {
    if (datoContent.personalityStatus[name] === value) {
      return;
    }

    updateData({
      content: 'home',
      queryParams: {
        userId: loggedInUserName,
        slug: loggedInUserSlug,
      },
      body: { personalityName: name, value },
    });
  };

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        userName={loggedInUserName}
        showMenu={showMenuHandler}
        id={loggedInUserId}
      />
      {isMenuOpened && (
        <Drawer showMenu={showMenuHandler} isMenuOpened={isMenuOpened}>
          <UserMenu
            userName={loggedInUserName}
            id={loggedInUserId}
            width={50}
            height={50}
            src={datoContent.avatar}
            slug={loggedInUserSlug}
          />
        </Drawer>
      )}
      {!isFirstLoading ? (
        <Grid type="home" isMenuOpened={isMenuOpened}>
          <GridItem templateArea="profileArea">
            <Sidebar
              userName={loggedInUserName}
              id={loggedInUserId}
              width={130}
              height={130}
              src={datoContent.avatar}
            />
          </GridItem>
          <GridItem templateArea="mainArea">
            <Box>
              <h1 className="title">Bem vindo, {loggedInUserName}</h1>
              <Divider />
              <OrkutNostalgicIconSet
                userName={loggedInUserName}
                id={loggedInUserId}
                slug={loggedInUserSlug}
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
              {datoContent && datoContent.length !== 0 ? (
                <ProfileRelations
                  title="Friends"
                  data={datoContent.friends}
                  type="avatar"
                  destination="friends"
                  total={datoContent.counters.totalFriends}
                />
              ) : (
                <NoContentMessage>
                  <FaSadCry /> you didn&apos;t add friends yet
                </NoContentMessage>
              )}
            </Box>
            <Box>
              {datoContent && datoContent.length !== 0 ? (
                <ProfileRelations
                  title="Communities"
                  data={datoContent.communities}
                  destination="communities"
                  total={datoContent.counters.totalCommunities}
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
  const { isAuthorized, userName, userId, slug } = validateToken(
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
      loggedInUserName: userName,
      loggedInUserId: userId,
      loggedInUserSlug: slug,
    },
  };
}

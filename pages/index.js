import React, { useEffect, useState, useCallback } from 'react';
import { FaSadCry } from 'react-icons/fa';

import { Box } from '../src/components/UI/layout/Box/styled';
import { Grid, GridItem } from '../src/components/UI/layout/Grid/styled';
import Drawer from '../src/Components/UI/Navigation/Drawer/Drawer';
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

const Home = ({ githubUser, id: userId }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { getData, data: datoContent, isFirstLoading } = useDatoCMS();

  useEffect(() => {
    if (isFirstLoading) {
      const fetchData = async () => {
        await getData({
          content: 'communities',
          queryParams: { userId: `?userId=${userId}` },
        });
      };

      fetchData();
    }
  }, [getData, userId, isFirstLoading]);

  const addCommunityHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      name: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser,
    };

    const response = await fetch('/api/datoCMSContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    });

    const parsedResponse = await response.json();

    setCommunities((prevCommunities) => [
      ...prevCommunities,
      parsedResponse.data,
    ]);
  };

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        githubUser={githubUser}
        showMenu={showMenuHandler}
        id={userId}
      />
      {isMenuOpened && (
        <Drawer showMenu={showMenuHandler} isMenuOpened={isMenuOpened}>
          <UserMenu
            githubUser={githubUser}
            id={userId}
            width={50}
            height={50}
            src={`https://github.com/${githubUser}.png`}
          />
        </Drawer>
      )}
      {!isFirstLoading ? (
        <Grid type="home" isMenuOpened={isMenuOpened}>
          <GridItem templateArea="profileArea">
            <Sidebar
              githubUser={githubUser}
              id={userId}
              width={130}
              height={130}
              src={`https://github.com/${githubUser}.png`}
            />
          </GridItem>
          <GridItem templateArea="mainArea">
            <Box>
              <h1 className="title">Bem vindo, {githubUser}</h1>
              <OrkutNostalgicIconSet recados={10} />
            </Box>
          </GridItem>
          <GridItem templateArea="profileRelationsArea">
            <Box>
              {false ? (
                <ProfileRelations
                  title="Following"
                  data={followingUsers}
                  type="profile"
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
                  data={datoContent}
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
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { isAuthorized, githubUser, id } = validateToken(
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
      githubUser,
      id,
    },
  };
}

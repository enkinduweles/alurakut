import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box } from '../../src/components/UI/layout/Box/styled';
import { Grid, GridItem } from '../../src/components/UI/layout/Grid/styled';
import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Card from '../../src/components/UI/display/Card/Card';
import { List, ListItem } from '../../src/components/UI/display/List/styled';
import Drawer from '../../src/components/UI/Navigation/Drawer/Drawer';
import PageControls from '../../src/components/Pagination/PageControls';
import PageCount from '../../src/components/Pagination/PageCount';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import { UserMenu } from '../../src/components/UserMenu/styled';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons/index';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';

import {
  Header,
  AddFriend,
  ListItemFriend,
} from '../../src/components/FriendsPage/styled';

const FAKE_FRIENDLIST = [
  {
    id: 1,
    title: 'Enkindu Weles',
    bodyContent: 'javascript developer',
    src: 'https://github.com/enkinduweles.png',
  },
  {
    id: 2,
    title: 'Enkindu Weles',
    bodyContent: 'node developer',
    src: 'https://github.com/enkinduweles.png',
  },
];

const FriendsPage = ({ ownerId, githubUser }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const router = useRouter();
  const { id: userId } = router.query;
  const {
    getData,
    updateData,
    data: datoContent,
    error,
    isFirstLoading,
  } = useDatoCMS();

  useEffect(() => {
    if (isFirstLoading) {
      const fetchScraps = async () => {
        await getData({
          content: 'profile',
          queryParams: { userId: `?userId=${userId}` },
        });
      };

      fetchScraps();
    }
  }, [getData, userId, datoContent, isFirstLoading]);

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        showMenu={showMenuHandler}
        githubUser={githubUser}
        id={ownerId}
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

      <Grid isMenuOpened={isMenuOpened}>
        <GridItem templateArea="profileArea">
          <Sidebar
            githubUser={githubUser}
            id={ownerId}
            width={130}
            height={130}
            src={`https://github.com/${githubUser}.png`}
          />
        </GridItem>
        <GridItem templateArea="mainArea">
          <Box>
            <Header>Amigos</Header>
            <Breadcrumb />
            <AddFriend>Adicionar</AddFriend>

            <PageCount />

            <List>
              {FAKE_FRIENDLIST.map(({ title, bodyContent, id, src }) => {
                return (
                  <ListItemFriend key={id}>
                    <Card
                      title={title}
                      bodyContent={bodyContent}
                      width={60}
                      height={60}
                      src={src}
                    />
                  </ListItemFriend>
                );
              })}
            </List>
            <PageControls />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default FriendsPage;

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
      ownerId: id,
    },
  };
}

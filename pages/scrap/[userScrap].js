import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { FaSadCry } from 'react-icons/fa';

import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import { Box } from '../../src/components/UI/layout/Box/styled';
import { Grid, GridItem } from '../../src/components/UI/layout/Grid/styled';
import { List as ScrapList } from '../../src/components/UI/display/List/styled';
import { UserMenu } from '../../src/components/UserMenu/styled';
import Drawer from '../../src/components/UI/Navigation/Drawer/Drawer';
import Input from '../../src/components/UI/inputs/Input/Input';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import Scrap from '../../src/components/Scrap/Scrap';
import Spinner from '../../src/components/Spinner/Spinner';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';

import {
  ScrapListItem,
  Header,
  SubmitButton,
  ScrapBox,
} from '../../src/components/ScrapPage/styled';

const ScrapPage = ({ githubUser, ownerId }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const { id: userId, userScrap } = router.query;
  const {
    getData,
    createData,
    deleteData,
    data: datoContent,
    isFirstLoading,
    error,
  } = useDatoCMS();

  useEffect(() => {
    if (isFirstLoading) {
      getData({
        content: 'scrap',
        queryParams: { userId: `?userId=${userId}` },
      });
    }
  }, [getData, userId, isFirstLoading]);

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  const sendScrapHandler = (event) => {
    event.preventDefault();

    const mountedScrap = {
      author: userScrap,
      message,
      userId,
    };

    createData({
      content: 'scrap',
      queryParams: { userId: `?userId=${userId}` },
      body: mountedScrap,
    });

    setMessage('');
  };

  const deleteScrapHandler = useCallback(
    (scrapId) => {
      deleteData({
        content: 'scrap',
        queryParams: {
          scrapId,
          userId,
        },
      });
    },
    [deleteData, userId]
  );

  return (
    <>
      <AlurakutMenu
        id={userId}
        githubUser={githubUser}
        showMenu={showMenuHandler}
        isMenuOpened={isMenuOpened}
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
        error.status !== 404 ? (
          <Grid isMenuOpened={isMenuOpened}>
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
                <ScrapBox onSubmit={sendScrapHandler}>
                  <Input
                    as="textarea"
                    name="scrapInput"
                    rows="4"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <SubmitButton type="submit">Enviar</SubmitButton>
                </ScrapBox>
              </Box>

              <Box>
                {datoContent.length === 0 && (
                  <p className="noScrap">
                    <FaSadCry /> you don&apos;t have scraps yet
                  </p>
                )}
                <Header>
                  Página de recados de {githubUser} ({datoContent.length})
                </Header>
                {datoContent.length !== 0 && (
                  <ScrapList githubUser={githubUser}>
                    {datoContent.map(({ id, author, message }) => {
                      return (
                        <ScrapListItem key={id}>
                          <Scrap
                            layout="responsive"
                            src={`https://github.com/${author}.png`}
                            alt={author}
                            width={60}
                            height={60}
                            scrapId={id}
                            author={author}
                            message={message}
                            onDeleteScrap={() => deleteScrapHandler(id)}
                          />
                        </ScrapListItem>
                      );
                    })}
                  </ScrapList>
                )}
              </Box>
            </GridItem>
          </Grid>
        ) : (
          <div className="gbError">
            <p>
              <span className="gbSadFace">:( </span>
              {error.message}
            </p>
          </div>
        )
      ) : (
        <Spinner />
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default ScrapPage;

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

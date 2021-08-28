import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { FaSadCry } from 'react-icons/fa';

import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import { MainGrid } from '../../src/components/MainGrid/MainGrid';
import Spinner from '../../src/components/Spinner/Spinner';
import { UserInfo } from '../../src/components/UserInfo/UserInfo';
import { validateToken } from '../../src/utils/auth';
import { ScrapList } from '../../src/components/ScrapList/ScrapList';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';

import {
  ScrapGridItem,
  ScrapsWrapper,
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
  } = useDatoCMS();

  console.log(router.query);
  useEffect(() => {
    if (isFirstLoading) {
      const fetchScraps = async () => {
        await getData({
          content: 'scrap',
          queryParams: { userId: `?userId=${userId}` },
        });
      };

      fetchScraps();
    }
  }, [getData, userId, isFirstLoading]);

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  const sendScrapHandler = async (event) => {
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
    async (scrapId) => {
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
      <MainGrid type="scrap" isMenuOpened={isMenuOpened}>
        <ScrapGridItem templateArea="profileArea">
          <UserInfo githubUser={githubUser} id={userId} />
        </ScrapGridItem>
        {!isFirstLoading ? (
          <ScrapGridItem templateArea="mainArea">
            <ScrapsWrapper>
              <section className="sectionForm">
                <form onSubmit={sendScrapHandler}>
                  <textarea
                    name="scrapInput"
                    rows="4"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  ></textarea>
                  <button>Enviar</button>
                </form>
              </section>
            </ScrapsWrapper>

            <ScrapsWrapper>
              {datoContent.length === 0 && (
                <p className="noScrap">
                  <FaSadCry /> you don&apos;t have scraps yet
                </p>
              )}
              {datoContent.length !== 0 && (
                <ScrapList
                  scraps={datoContent}
                  onDeleteScrap={deleteScrapHandler}
                  githubUser={githubUser}
                />
              )}
            </ScrapsWrapper>
          </ScrapGridItem>
        ) : (
          <Spinner />
        )}
      </MainGrid>
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

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { FaSadCry } from 'react-icons/fa';

import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import { Box } from '../../src/components/ui/layout/Box/styled';
import Card from '../../src/components/ui/display/Card/Card';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import { List as ScrapList } from '../../src/components/ui/display/List/styled';
import { UserMenu } from '../../src/components/UserMenu/styled';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Input from '../../src/components/ui/inputs/Input/Input';
import Sidebar from '../../src/components/Sidebar/Sidebar';
// import Scrap from '../../src/components/Scrap/Scrap';
import DialogBox from '../../src/components/DialogBox/DialogBox';
import PageCount from '../../src/components/Pagination/PageCount';
import PageControls from '../../src/components/Pagination/PageControls';
import Modal from '../../src/components/ui/display/Modal/Modal';
import Spinner from '../../src/components/Spinner/Spinner';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';

import {
  ScrapListItem,
  Header,
  SubmitButton,
  ScrapBox,
} from '../../src/components/ScrapPage/styled';
import { usePageOperations } from '../../src/hooks/usePageOperations';

const ScrapPage = ({
  loggedInUserName,
  loggedInUserId,
  loggedInSlug,
  page,
}) => {
  const [message, setMessage] = useState('');

  const router = useRouter();
  const { userId, userScrap: userName, slug } = router.query;

  const {
    getData,
    createData,
    deleteData,
    data: datoContent,
    isFirstLoading,
    status,
  } = useDatoCMS();

  const {
    isMenuOpened,
    isModalOpened,
    itemsToDelete,
    onShowMenu,
    onShowModal,
    onCheckCard,
    onCleanItemsToDelete,
  } = usePageOperations();

  useEffect(() => {
    if (isFirstLoading) {
      getData({
        content: 'scrap',
        queryParams: { userId, slug },
      });
    }
  }, [getData, userId, isFirstLoading]);

  const sendScrapHandler = (event) => {
    event.preventDefault();

    if (message.trim() !== '') {
      const mountedScrap = {
        reader: slug,
        message,
        writer: loggedInSlug,
      };

      createData({
        content: 'scrap',
        queryParams: { userId, slug },
        body: mountedScrap,
      });

      setMessage('');
    }
  };

  console.log(datoContent);
  return (
    <>
      <AlurakutMenu
        id={loggedInUserId}
        userName={loggedInUserName}
        showMenu={onShowMenu}
        isMenuOpened={isMenuOpened}
      />

      {isMenuOpened && (
        <Drawer showMenu={onShowMenu} isMenuOpened={isMenuOpened}>
          <UserMenu
            userName={loggedInUserName}
            id={loggedInUserId}
            slug={loggedInSlug}
            width={50}
            height={50}
            src={datoContent.avatar}
          />
        </Drawer>
      )}

      {!isFirstLoading ? (
        <Grid isMenuOpened={isMenuOpened}>
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
              {isModalOpened && (
                <Modal showModal={onShowModal}>
                  <DialogBox
                    onShowModal={onShowModal}
                    onDelete={deleteData}
                    content="scrap"
                    userId={userId}
                    githubId={loggedInUserId}
                    items={itemsToDelete}
                    onCleanItemsToDelete={onCleanItemsToDelete}
                    slug={slug}
                  />
                </Modal>
              )}

              <Breadcrumb />
              <ScrapBox onSubmit={sendScrapHandler}>
                <Input
                  as="textarea"
                  name="scrapInput"
                  rows="4"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <SubmitButton type="submit" disabled={message.length === 0}>
                  Enviar
                </SubmitButton>
              </ScrapBox>
            </Box>

            <Box>
              {datoContent.length === 0 && (
                <p className="noScrap">
                  <FaSadCry /> you don&apos;t have scraps yet
                </p>
              )}
              <Header>
                Página de recados de {loggedInUserName} (
                {datoContent.scraps.length})
              </Header>

              <PageCount
                counters={datoContent.counters}
                selectedItems={itemsToDelete}
                onShowModal={onShowModal}
              />
              {datoContent.length !== 0 && (
                <ScrapList>
                  {datoContent.scraps.map(
                    ({ writer: { name, avatar }, message, id }) => {
                      return (
                        <ScrapListItem key={id}>
                          <Card
                            title={name}
                            bodyContent={message}
                            width={60}
                            height={60}
                            src={avatar}
                            contentId={id}
                            onCheckCard={onCheckCard}
                          />
                        </ScrapListItem>
                      );
                    }
                  )}
                </ScrapList>
              )}
              <PageControls
                requestProcess={status}
                currentPage={page}
                userName={userName}
                userId={userId}
                lastPage={datoContent.counters.lastPage}
              />
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

export default ScrapPage;

export async function getServerSideProps({ query: { page = 1 }, ...context }) {
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
      loggedInSlug: slug,
      page: Number(page),
    },
  };
}

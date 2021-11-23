import { FaSadCry } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Card from '../../src/components/ui/display/Card/Card';
import DialogBox from '../../src/components/DialogBox/DialogBox';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Input from '../../src/components/ui/inputs/Input/Input';
import Modal from '../../src/components/ui/display/Modal/Modal';
import PageControls from '../../src/components/Pagination/PageControls';
import PageCount from '../../src/components/Pagination/PageCount';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import Spinner from '../../src/components/Spinner/Spinner';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import { Box } from '../../src/components/ui/layout/Box/styled';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import { List as ScrapList } from '../../src/components/ui/display/List/styled';
import NoContentMessage from '../../src/components/NoContentMessage/NoContentMessage';
import { UserMenu } from '../../src/components/UserMenu/styled';

import rootPath from '../../src/utils/apiPaths';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { usePageOperations } from '../../src/hooks/usePageOperations';
import { validateToken } from '../../src/utils/auth';

import {
  Header,
  ScrapBox,
  ScrapListItem,
  SubmitButton,
} from '../../src/components/ScrapPage/styled';

const ScrapPage = ({ githubName, githubId, userId, page }) => {
  const [message, setMessage] = useState('');

  const router = useRouter();
  const { userId: slug, userScrap: userName } = router.query;

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
        content: rootPath.scrap.api,
        queryParams: { userId, page },
      });
    }
  }, [getData, userId, isFirstLoading, page]);

  useEffect(() => {
    if (datoContent && datoContent.counters.lastPage !== 0) {
      if (datoContent.counters.lastPage < page) {
        router.push(
          `/${rootPath.scrap.page}/${githubName}?userId=${userId}${
            page === 1 ? '' : `&page=${datoContent.counters.lastPage}`
          }`
        );
      }
    }
  }, [datoContent, userId, page, githubName, router]);

  const sendScrapHandler = (event) => {
    event.preventDefault();

    if (message.trim() !== '') {
      const mountedScrap = {
        reader: slug,
        message,
        writer: userId,
      };

      createData({
        content: rootPath.scrap.api,
        queryParams: { userId },
        body: mountedScrap,
      });

      setMessage('');
    }
  };

  return (
    <>
      <AlurakutMenu
        id={userId}
        userName={githubName}
        showMenu={onShowMenu}
        isMenuOpened={isMenuOpened}
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
        <Grid isMenuOpened={isMenuOpened}>
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
              {isModalOpened && (
                <Modal showModal={onShowModal}>
                  <DialogBox
                    onShowModal={onShowModal}
                    onDelete={deleteData}
                    rootPath={rootPath.scrap.api}
                    userId={userId}
                    items={itemsToDelete}
                    onCleanItemsToDelete={onCleanItemsToDelete}
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
              <Header>
                Página de recados de {userName} ({datoContent.scraps.length})
              </Header>

              {datoContent && datoContent.scraps.length !== 0 ? (
                <>
                  <PageCount
                    counters={datoContent.counters}
                    selectedItems={itemsToDelete}
                    onShowModal={onShowModal}
                  />

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

                  <PageControls
                    rootPath={rootPath.scrap.page}
                    requestProcess={status}
                    currentPage={page}
                    userName={userName}
                    userId={userId}
                    lastPage={datoContent.counters.lastPage}
                    getData={getData}
                  />
                </>
              ) : (
                <NoContentMessage>
                  <strong>{githubName}</strong>, you don&apos;t have scrap yet
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

export default ScrapPage;

export async function getServerSideProps({ query: { page = 1 }, ...context }) {
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
      page: Number(page),
    },
  };
}

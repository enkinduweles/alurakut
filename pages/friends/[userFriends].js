import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Card from '../../src/components/ui/display/Card/Card';
import DialogBox from '../../src/components/DialogBox/DialogBox';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Modal from '../../src/components/ui/display/Modal/Modal';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import Spinner from '../../src/components/Spinner/Spinner';
import PageControls from '../../src/components/Pagination/PageControls';
import PageCount from '../../src/components/Pagination/PageCount';
import Preview from '../../src/components/Preview/Preview';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons/index';
import { Box } from '../../src/components/ui/layout/Box/styled';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import { List } from '../../src/components/ui/display/List/styled';
import { NoContentMessage } from '../../src/components/NoContentMessage/styled';
import { UserMenu } from '../../src/components/UserMenu/styled';

import rootPath from '../../src/utils/apiPaths';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { usePageOperations } from '../../src/hooks/usePageOperations';
import { validateToken } from '../../src/utils/auth';

import {
  AddFriend,
  Header,
  ListItemFriend,
} from '../../src/components/FriendsPage/styled';

const FriendsPage = ({ githubName, userId, githubId, page }) => {
  const {
    isMenuOpened,
    isModalOpened,
    itemsToDelete,
    modalContentName,
    onShowMenu,
    onShowModal,
    onCheckCard,
    onCleanItemsToDelete,
  } = usePageOperations();

  const router = useRouter();
  const { userId: slug, userFriends: userName } = router.query;

  const {
    getData,
    createData,
    cleanErrors,
    data: datoContent,
    status,
    isFirstLoading,
    error,
    deleteData,
  } = useDatoCMS();

  useEffect(() => {
    if (isFirstLoading) {
      getData({
        content: rootPath.friend.api,
        queryParams: { userId, page },
      });
    }
  }, [getData, userId, page, isFirstLoading]);

  useEffect(() => {
    if (datoContent && datoContent.counters.lastPage !== 0) {
      if (datoContent.counters.lastPage < page) {
        router.push(
          `/${rootPath.friend.page}/${githubName}?userId=${userId}${
            page === 1 ? '' : `&page=${datoContent.counters.lastPage}`
          }`
        );
      }
    }
  }, [datoContent, userId, page, githubName, router]);

  const returnModalContent = (componentName) => {
    switch (componentName) {
      case 'PREVIEW':
        return (
          <Preview
            showModal={onShowModal}
            addFriendHandler={createData}
            cleanErrors={cleanErrors}
            currentPage={page}
            error={error}
            status={status}
            rootPath={rootPath.friend.api}
          />
        );

      case 'DIALOGBOX':
        return (
          <DialogBox
            onShowModal={onShowModal}
            onDelete={deleteData}
            userId={userId}
            items={itemsToDelete}
            onCleanItemsToDelete={onCleanItemsToDelete}
            rootPath={rootPath.friend.api}
          />
        );

      default:
        throw new Error('You must provide a valid component name');
    }
  };

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        showMenu={onShowMenu}
        userName={githubName}
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
                  {returnModalContent(modalContentName)}
                </Modal>
              )}
              <Header>Amigos</Header>
              <Breadcrumb />
              <AddFriend onClick={() => onShowModal('PREVIEW')}>
                Adicionar
              </AddFriend>

              {datoContent && datoContent.friends.length !== 0 ? (
                <>
                  <PageCount
                    counters={datoContent.counters}
                    selectedItems={itemsToDelete}
                    onShowModal={() => onShowModal('DIALOGBOX')}
                  />

                  <List>
                    {datoContent.friends.map(
                      ({ name, avatar, githubId, location, id }) => {
                        return (
                          <ListItemFriend key={githubId}>
                            <Card
                              title={name}
                              bodyContent={location}
                              width={60}
                              height={60}
                              src={avatar}
                              contentId={id}
                              onCheckCard={onCheckCard}
                            />
                          </ListItemFriend>
                        );
                      }
                    )}
                  </List>
                  <PageControls
                    rootPath={rootPath.friend}
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
                  <strong>{githubName}</strong>, you don&apos;t have friends yet
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

export default FriendsPage;

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

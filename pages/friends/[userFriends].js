import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

import { Box } from '../../src/components/ui/layout/Box/styled';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Card from '../../src/components/ui/display/Card/Card';
import { List, ListItem } from '../../src/components/ui/display/List/styled';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Modal from '../../src/components/ui/display/Modal/Modal';
import Preview from '../../src/components/Preview/Preview';
import PageControls from '../../src/components/Pagination/PageControls';
import PageCount from '../../src/components/Pagination/PageCount';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import { UserMenu } from '../../src/components/UserMenu/styled';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons/index';
import Spinner from '../../src/components/Spinner/Spinner';
import DialogBox from '../../src/components/DialogBox/DialogBox';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { usePageOperations } from '../../src/hooks/usePageOperations';

import {
  Header,
  AddFriend,
  DeleteFriend,
  ListItemFriend,
  CounterWrapper,
  Badge,
  ButtonWrapper,
} from '../../src/components/FriendsPage/styled';

const FriendsPage = ({
  loggedInUserName,
  loggedInUserId,
  loggedInSlug,
  page,
}) => {
  const {
    isMenuOpened,
    isModalOpened,
    itemsToDelete,
    onShowMenu,
    onShowModal,
    onCheckCard,
    onCleanItemsToDelete,
  } = usePageOperations();

  const router = useRouter();
  const { userId, userFriends: userName, slug } = router.query;

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
    getData({
      content: 'friends',
      queryParams: { userId, page, slug },
    });
  }, [getData, userId, page, slug]);

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
          />
        );

      case 'DIALOGBOX':
        return (
          <DialogBox
            showModal={onShowModal}
            onDelete={deleteData}
            userId={userId}
            items={itemsToDelete}
            cleanUsersToDelete={onCleanItemsToDelete}
            githubId={loggedInUserId}
            slug={slug}
          />
        );
    }

    return null;
  };
  console.log(datoContent);
  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        showMenu={onShowMenu}
        userName={loggedInUserName}
        id={loggedInUserId}
      />
      {isMenuOpened && (
        <Drawer showMenu={onShowMenu} isMenuOpened={isMenuOpened}>
          <UserMenu
            userName={loggedInUserName}
            id={loggedInUserId}
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
                  {returnModalContent(modalContent)}
                </Modal>
              )}
              <Header>Amigos</Header>
              <Breadcrumb />
              <AddFriend onClick={() => onShowModal('PREVIEW')}>
                Adicionar
              </AddFriend>

              <PageCount
                counters={datoContent.counters}
                selectedItems={itemsToDelete}
                onShowModal={onShowModal}
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

export default FriendsPage;

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

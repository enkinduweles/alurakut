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

import {
  Header,
  AddFriend,
  DeleteFriend,
  ListItemFriend,
  CounterWrapper,
  Badge,
  ButtonWrapper,
} from '../../src/components/FriendsPage/styled';

const FriendsPage = ({ ownerId, githubUser, page }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const router = useRouter();
  const { id: userId } = router.query;

  const {
    getData,
    createData,
    cleanErrors,
    data,
    status,
    isFirstLoading,
    error,
    deleteData,
  } = useDatoCMS();

  useEffect(() => {
    getData({
      content: 'friends',
      queryParams: { userId, limitBy: 6, page },
    });
  }, [getData, userId, page]);

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  const returnModalContent = (componentName) => {
    switch (componentName) {
      case 'PREVIEW':
        return (
          <Preview
            showModal={showModalHandler}
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
            showModal={showModalHandler}
            onDeleteFriend={deleteData}
            userId={userId}
            items={usersToDelete}
            cleanUsersToDelete={setUsersToDelete}
          />
        );
    }

    return null;
  };

  const showModalHandler = (componentName) => {
    setIsModalOpened((prevState) => !prevState);
    setModalContent(componentName);
  };

  const checkCardHandler = useCallback(
    (contentId, isCardChecked) => {
      if (!isCardChecked) {
        const filteredUsers = usersToDelete.filter((user) => {
          return contentId !== user;
        });

        setUsersToDelete(filteredUsers);
      } else {
        setUsersToDelete((prevState) => [...prevState, contentId]);
      }
    },
    [usersToDelete]
  );

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        showMenu={showMenuHandler}
        userName={userName}
        id={ownerId}
      />
      {isMenuOpened && (
        <Drawer showMenu={showMenuHandler} isMenuOpened={isMenuOpened}>
          <UserMenu
            userName={userName}
            id={userId}
            width={50}
            height={50}
            src={`https://github.com/${userName}.png`}
          />
        </Drawer>
      )}
      {!isFirstLoading ? (
        <Grid isMenuOpened={isMenuOpened}>
          <GridItem templateArea="profileArea">
            <Sidebar
              userName={userName}
              id={ownerId}
              width={130}
              height={130}
              src={`https://github.com/${userName}.png`}
            />
          </GridItem>
          <GridItem templateArea="mainArea">
            <Box>
              {isModalOpened && (
                <Modal showModal={showModalHandler}>
                  {returnModalContent(modalContent)}
                  {/* <Preview
                    showModal={showModalHandler}
                    addFriendHandler={createData}
                    cleanErrors={cleanErrors}
                    currentPage={page}
                    error={error}
                  /> */}
                </Modal>
              )}
              <Header>Amigos</Header>
              <Breadcrumb />
              <AddFriend onClick={() => showModalHandler('PREVIEW')}>
                Adicionar
              </AddFriend>

              <CounterWrapper>
                <PageCount counters={data.counters} />
                {usersToDelete.length > 0 && (
                  <ButtonWrapper>
                    <Badge>{usersToDelete.length}</Badge>
                    <DeleteFriend onClick={() => showModalHandler('DIALOGBOX')}>
                      <MdDelete />
                    </DeleteFriend>
                  </ButtonWrapper>
                )}
              </CounterWrapper>
              <List>
                {data.friends.map(
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
                          onCheckCard={checkCardHandler}
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
                lastPage={data.counters.lastPage}
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
  const { isAuthorized, userName, userId } = validateToken(
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
      page: Number(page),
    },
  };
}

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { MdExitToApp } from 'react-icons/md';

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
import CommunityCreator from '../../src/components/CommunityCreator/CommunityCreator';
import DialogBox from '../../src/components/DialogBox/DialogBox';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';

import {
  Header,
  Badge,
  ButtonWrapper,
  CounterWrapper,
  CreateCommunity,
  LeaveOutCommunity,
  ListItemCommunity,
} from '../../src/components/CommunitiesPage/styled';

const CommunitiesPage = ({ ownerId, githubUser, page }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [communitiesToLeave, setCommunitiesToLeave] = useState([]);
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
      content: 'communities',
      queryParams: { userId, limitBy: 6, page },
    });
  }, [getData, userId, page]);

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  const returnModalContent = (componentName) => {
    switch (componentName) {
      case 'COMMUNITY_CREATOR':
        return (
          <CommunityCreator
            showModal={showModalHandler}
            onCreateCommunity={createData}
            cleanErrors={cleanErrors}
            currentPage={page}
            error={error}
            status={status}
          />
        );

      // case 'DIALOGBOX':
      //   return (
      //     <DialogBox
      //       showModal={showModalHandler}
      //       onDeleteFriend={deleteData}
      //       userId={userId}
      //       items={usersToDelete}
      //       cleanUsersToDelete={setUsersToDelete}
      //     />
      //   );
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
        const filteredCommunities = communitiesToLeave.filter((communityId) => {
          return contentId !== communityId;
        });
        setCommunitiesToLeave(filteredCommunities);
      } else {
        setCommunitiesToLeave((prevState) => [...prevState, contentId]);
      }
    },
    [communitiesToLeave]
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
                </Modal>
              )}
              <Header>Comunidades</Header>
              <Breadcrumb />
              <CreateCommunity
                onClick={() => showModalHandler('COMMUNITY_CREATOR')}
              >
                Criar
              </CreateCommunity>

              <CounterWrapper>
                <PageCount counters={data.counters} />
                {communitiesToLeave.length > 0 && (
                  <ButtonWrapper>
                    <Badge>{communitiesToLeave.length}</Badge>
                    <LeaveOutCommunity
                      onClick={() => showModalHandler('DIALOGBOX')}
                    >
                      <MdExitToApp />
                    </LeaveOutCommunity>
                  </ButtonWrapper>
                )}
              </CounterWrapper>
              <List>
                {data.communities.map(({ name, member, thumbnail, id }) => {
                  return (
                    <ListItemCommunity key={id}>
                      <Card
                        title={name}
                        bodyContent={`${member} membro(s)`}
                        width={60}
                        height={60}
                        src={thumbnail}
                        contentId={id}
                        onCheckCard={checkCardHandler}
                      />
                    </ListItemCommunity>
                  );
                })}
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

export default CommunitiesPage;

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

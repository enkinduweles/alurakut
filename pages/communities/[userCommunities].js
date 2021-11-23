import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Card from '../../src/components/ui/display/Card/Card';
import CommunityCreator from '../../src/components/CommunityCreator/CommunityCreator';
import DialogBox from '../../src/components/DialogBox/DialogBox';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Modal from '../../src/components/ui/display/Modal/Modal';
import PageControls from '../../src/components/Pagination/PageControls';
import PageCount from '../../src/components/Pagination/PageCount';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import Spinner from '../../src/components/Spinner/Spinner';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons/index';
import { Box } from '../../src/components/ui/layout/Box/styled';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import { List } from '../../src/components/ui/display/List/styled';
import { NoContentMessage } from '../../src/components/NoContentMessage/styled';
import { UserMenu } from '../../src/components/UserMenu/styled';

import placeHolderImage from '../../public/default_image.svg';
import rootPath from '../../src/utils/apiPaths';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { usePageOperations } from '../../src/hooks/usePageOperations';
import { validateToken } from '../../src/utils/auth';

import {
  CreateCommunity,
  Header,
  ListItemCommunity,
} from '../../src/components/CommunitiesPage/styled';

const CommunitiesPage = ({ githubName, githubId, userId, page }) => {
  const router = useRouter();
  const { userId: slug, userCommunities: userName } = router.query;

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

  const {
    isMenuOpened,
    isModalOpened,
    itemsToDelete,
    modalContentName,
    onCleanItemsToDelete,
    onShowMenu,
    onShowModal,
    onCheckCard,
  } = usePageOperations();

  useEffect(() => {
    if (isFirstLoading) {
      getData({
        content: rootPath.community.api,
        queryParams: { userId, page },
      });
    }
  }, [getData, userId, page, isFirstLoading]);

  useEffect(() => {
    if (datoContent && datoContent.counters.lastPage !== 0) {
      if (datoContent.counters.lastPage < page) {
        router.push(
          `/${rootPath.community.page}/${githubName}?userId=${userId}${
            page === 1 ? '' : `&page=${datoContent.counters.lastPage}`
          }`
        );
      }
    }
  }, [datoContent, userId, page, githubName, router]);

  const returnModalContent = (componentName) => {
    switch (componentName) {
      case 'COMMUNITY_CREATOR':
        return (
          <CommunityCreator
            showModal={onShowModal}
            onCreateCommunity={createData}
            cleanErrors={cleanErrors}
            currentPage={page}
            error={error}
            status={status}
            rootPath={rootPath.community.api}
            userId={userId}
            userName={githubName}
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
            rootPath={rootPath.community.api}
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
              <Header>Comunidades</Header>
              <Breadcrumb />
              <CreateCommunity onClick={() => onShowModal('COMMUNITY_CREATOR')}>
                Criar
              </CreateCommunity>
              {datoContent && datoContent.communities.length !== 0 ? (
                <>
                  <PageCount
                    counters={datoContent.counters}
                    selectedItems={itemsToDelete}
                    onShowModal={() => onShowModal('DIALOGBOX')}
                  />

                  <List>
                    {datoContent.communities.map(
                      ({ name, members, thumbnail, id }) => {
                        const thumnailValue = thumbnail
                          ? thumbnail.url
                          : placeHolderImage;
                        return (
                          <ListItemCommunity key={id}>
                            <Card
                              title={name}
                              bodyContent={`${members.length} membro(s)`}
                              src={thumnailValue}
                              contentId={id}
                              onCheckCard={onCheckCard}
                            />
                          </ListItemCommunity>
                        );
                      }
                    )}
                  </List>
                  <PageControls
                    rootPath={rootPath.community}
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
                  <strong>{githubName}</strong>, you don&apos;t participate of
                  any community yet
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

export default CommunitiesPage;

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

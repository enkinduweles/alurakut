import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Sidebar from '../../src/components/Sidebar/Sidebar';
import Spinner from '../../src/components/Spinner/Spinner';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import { Box } from '../../src/components/ui/layout/Box/styled';
import { Button } from '../../src/components/ui/inputs/Button/styled';
import { Divider } from '../../src/components/ui/display/Divider/styled';
import { Form } from '../../src/components/ui/layout/Form/styled';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import { UserMenu } from '../../src/components/UserMenu/styled';

import rootPath from '../../src/utils/apiPaths';
import { shallowEqual } from '../../src/utils/shallowEquality';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { usePageOperations } from '../../src/hooks/usePageOperations';
import { validateToken } from '../../src/utils/auth';

import {
  FormControls,
  Header,
  HeaderWrapper,
  Input,
} from '../../src/components/ProfilePage/styled';

const ProfilePages = ({ githubName, githubId, userId }) => {
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [formProfile, setFormProfile] = useState({
    id: '',
    city: '',
    state: '',
    profession: '',
    contact: '',
  });

  const router = useRouter();
  const { userId: slug } = router.query;

  const {
    getData,
    updateData,
    data: datoContent,
    error,
    isFirstLoading,
  } = useDatoCMS();

  const { isMenuOpened, onShowMenu } = usePageOperations();

  useEffect(() => {
    if (isFirstLoading) {
      getData({
        content: rootPath.profile,
        queryParams: { userId },
      });
    }
  }, [getData, userId, isFirstLoading]);

  useEffect(() => {
    if (datoContent || Object.entries(error).length !== 0) {
      setFormProfile(datoContent);
    }
  }, [datoContent, error]);

  const changeProfileModeHandler = () => {
    setProfileEditMode((prevState) => !prevState);
  };

  const submitProfileInfoHandler = async (event) => {
    event.preventDefault();

    if (!shallowEqual(formProfile, datoContent)) {
      await updateData({
        content: rootPath.profile,
        queryParams: {
          userId,
          activeToast: true,
        },
        body: formProfile,
      });
    }

    setProfileEditMode((prevState) => !prevState);
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
              <HeaderWrapper>
                <div>
                  <Header>Perfil</Header>
                  <Breadcrumb />
                </div>
                {userId.toString() === slug
                  ? !profileEditMode && (
                      <Button onClick={changeProfileModeHandler}>Editar</Button>
                    )
                  : null}
              </HeaderWrapper>
              <Divider />

              <Form onSubmit={submitProfileInfoHandler}>
                <Input
                  label="cidade"
                  type="text"
                  name="city"
                  disabled={!profileEditMode}
                  value={formProfile.city}
                  onChange={(event) =>
                    setFormProfile((prevState) => ({
                      ...prevState,
                      city: event.target.value,
                    }))
                  }
                />

                <Input
                  label="estado"
                  type="text"
                  name="state"
                  disabled={!profileEditMode}
                  className={!profileEditMode ? 'viewMode' : ''}
                  value={formProfile ? formProfile.state : ''}
                  onChange={(event) =>
                    setFormProfile((prevState) => ({
                      ...prevState,
                      state: event.target.value,
                    }))
                  }
                />

                <Input
                  label="profissão"
                  type="text"
                  name="profession"
                  disabled={!profileEditMode}
                  className={!profileEditMode ? 'viewMode' : ''}
                  value={formProfile ? formProfile.profession : ''}
                  onChange={(event) =>
                    setFormProfile((prevState) => ({
                      ...prevState,
                      profession: event.target.value,
                    }))
                  }
                />

                <Input
                  label="contato"
                  type="text"
                  name="contact"
                  disabled={!profileEditMode}
                  className={!profileEditMode ? 'viewMode' : ''}
                  value={formProfile ? formProfile.contact : ''}
                  onChange={(event) =>
                    setFormProfile((prevState) => ({
                      ...prevState,
                      contact: event.target.value,
                    }))
                  }
                />

                {profileEditMode && (
                  <FormControls>
                    <Button
                      outline
                      type="reset"
                      onClick={() => setProfileEditMode(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar</Button>
                  </FormControls>
                )}
              </Form>
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <Spinner />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            textTransform: 'capitalize',
          },
        }}
      />
    </>
  );
};

export default ProfilePages;

export async function getServerSideProps(context) {
  const { isAuthorized, githubName, githubId, userId } = validateToken(
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
    },
  };
}

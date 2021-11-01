import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import { Box } from '../../src/components/ui/layout/Box/styled';
import { Button } from '../../src/components/ui/inputs/Button/styled';
import { Divider } from '../../src/components/ui/display/Divider/styled';
import { Form } from '../../src/components/ui/layout/Form/styled';
import { Grid, GridItem } from '../../src/components/ui/layout/Grid/styled';
import { UserMenu } from '../../src/components/UserMenu/styled';
import Drawer from '../../src/components/ui/navigation/Drawer/Drawer';
import Sidebar from '../../src/components/Sidebar/Sidebar';

import {
  HeaderWrapper,
  Header,
  Input,
  FormControls,
} from '../../src/components/ProfilePage/styled';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import Spinner from '../../src/components/Spinner/Spinner';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { shallowEqual } from '../../src/utils/shallowEquality';

const ProfilePages = ({ githubUser, ownerId }) => {
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [formProfile, setFormProfile] = useState({
    id: '',
    city: '',
    state: '',
    profession: '',
    contact: '',
  });
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const router = useRouter();
  const { id: userId } = router.query;
  const {
    getData,
    updateData,
    data: datoContent,
    error,
    isFirstLoading,
  } = useDatoCMS();

  useEffect(() => {
    if (isFirstLoading) {
      getData({
        content: 'profile',
        queryParams: { userId: `?userId=${userId}` },
      });
    }
  }, [getData, userId, datoContent, isFirstLoading]);

  useEffect(() => {
    if (datoContent) {
      setFormProfile(datoContent);
    }
  }, [datoContent]);

  const changeProfileModeHandler = () => {
    setProfileEditMode((prevState) => !prevState);
  };

  const submitProfileInfoHandler = async (event) => {
    event.preventDefault();

    if (!shallowEqual(formProfile, datoContent)) {
      await updateData({
        content: 'profile',
        queryParams: {
          userId: `?userId=${userId}`,
          activeToast: true,
        },
        body: formProfile,
      });
    }

    setProfileEditMode((prevState) => !prevState);
  };

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
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
              layout="intrinsic"
              width={130}
              height={130}
              src={`https://github.com/${userName}.png`}
            />
          </GridItem>

          <GridItem templateArea="mainArea">
            <Box>
              <HeaderWrapper>
                <Header>Perfil</Header>
                {ownerId.toString() === userId
                  ? !profileEditMode && (
                      <Button onClick={changeProfileModeHandler}>Editar</Button>
                    )
                  : null}
                {/* breadcrumbe */}
              </HeaderWrapper>
              <Divider />
              {error.status !== 404 ? (
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
              ) : (
                <div className="gbError">
                  <p>
                    <span className="gbSadFace">:( </span>
                    {error.message}
                  </p>
                </div>
              )}
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
    },
  };
}

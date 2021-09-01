import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import MainGrid from '../../src/components/MainGrid/MainGrid';
import UserInfo from '../../src/components/UserInfo/UserInfo';
import {
  Profile,
  ProfileGridItem,
} from '../../src/components/ProfilePages/styled';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import Spinner from '../../src/components/Spinner/Spinner';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { shallowEqual } from '../../src/utils/shallowEquality';

const ProfilePages = (props) => {
  const { githubUser, ownerId } = props;
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
      const fetchScraps = async () => {
        await getData({
          content: 'profile',
          queryParams: { userId: `?userId=${userId}` },
        });

        setFormProfile(datoContent);
      };

      fetchScraps();
    }
  }, [getData, userId, datoContent, isFirstLoading]);

  useEffect(() => {
    if (datoContent) {
      setFormProfile(datoContent);
    }
  }, [datoContent]);

  const changeProfileModeHandler = async () => {
    setProfileEditMode((prevState) => !prevState);
  };

  const submitProfileInfoHandler = async (event) => {
    event.preventDefault();

    if (!shallowEqual(formProfile, datoContent)) {
      await updateData({
        content: 'profile',
        queryParams: {
          userId: `?userId=${userId}`,
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
        githubUser={githubUser}
        id={ownerId}
      />
      {!isFirstLoading ? (
        <MainGrid type="profile" isMenuOpened={isMenuOpened}>
          <ProfileGridItem templateArea="profileArea">
            <UserInfo githubUser={githubUser} id={ownerId} />
          </ProfileGridItem>
          <ProfileGridItem templateArea="mainArea">
            <Profile as="section" profileEditMode={profileEditMode}>
              <header>
                <div className="profileHeaderContainer">
                  <h2>Perfil</h2>
                  {ownerId.toString() === userId ? (
                    !error.status && !profileEditMode ? (
                      <button onClick={changeProfileModeHandler}>Editar</button>
                    ) : null
                  ) : null}
                </div>
                {/* breadcrumbe */}
              </header>
              <article>
                {error.status !== 404 ? (
                  <form
                    className="userInfoForm"
                    onSubmit={submitProfileInfoHandler}
                  >
                    <div>
                      <label htmlFor="">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        disabled={!profileEditMode}
                        className={!profileEditMode ? 'viewMode' : ''}
                        value={formProfile ? formProfile.city : ''}
                        onChange={(event) =>
                          setFormProfile((prevState) => ({
                            ...prevState,
                            city: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="">Estado</label>
                      <input
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
                    </div>
                    <div>
                      <label htmlFor="">Profissão</label>
                      <input
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
                    </div>
                    <div>
                      <label htmlFor="">Contato</label>
                      <input
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
                    </div>

                    {profileEditMode && (
                      <div className="formControls">
                        <button
                          type="reset"
                          onClick={() => setProfileEditMode(false)}
                        >
                          Cancelar
                        </button>
                        <button type="submit">Salvar</button>
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="gbError">
                    <p>
                      <span className="gbSadFace">:( </span>
                      {error.message}
                    </p>
                  </div>
                )}
              </article>
            </Profile>
          </ProfileGridItem>
        </MainGrid>
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

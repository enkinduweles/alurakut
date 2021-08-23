import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';

import { MainGrid } from '../../src/components/MainGrid/MainGrid';
import { UserInfo } from '../../src/components/UserInfo/UserInfo';
import {
  Profile,
  ProfileGridItem,
} from '../../src/components/ProfilePages/styled';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import { Spinner } from '../../src/components/Spinner/Spinner';

import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { shallowEqual } from '../../src/utils/shallowEquality';

const ProfilePages = (props) => {
  const { githubUser, ownerId } = props;

  const router = useRouter();
  const { id: userId } = router.query;
  const { getData, updateData, datoContent, isFirstLoading } = useDatoCMS();
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [formProfile, setFormProfile] = useState({
    id: '',
    city: '',
    state: '',
    profession: '',
    contact: '',
  });
  const [isMenuOpened, setIsMenuOpened] = useState(false);

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
  }, [isFirstLoading, getData, userId, datoContent]);

  const changeProfileModeHandler = async () => {
    setProfileEditMode((prevState) => !prevState);
  };

  const submitProfileInfoHandler = async (event) => {
    event.preventDefault();

    if (!shallowEqual(formProfile, datoContent)) {
      await updateData({
        content: 'profile',
        queryParams: {
          itemId: `?profileId=${formProfile.id}`,
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

  // let profileContent = <Spinner />;

  // if (status === 'completed') {
  //   profileContent = (
  //     <form className="userInfoForm" onSubmit={submitProfileInfoHandler}>
  //       <div>
  //         <label htmlFor="">Cidade</label>
  //         <input
  //           type="text"
  //           name="city"
  //           disabled={!profileEditMode}
  //           className={!profileEditMode ? 'viewMode' : ''}
  //           value={formProfile.city}
  //           onChange={(event) =>
  //             setFormProfile((prevState) => ({
  //               ...prevState,
  //               city: event.target.value,
  //             }))
  //           }
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="">Estado</label>
  //         <input
  //           type="text"
  //           name="state"
  //           disabled={!profileEditMode}
  //           className={!profileEditMode ? 'viewMode' : ''}
  //           value={formProfile.state}
  //           onChange={(event) =>
  //             setFormProfile((prevState) => ({
  //               ...prevState,
  //               state: event.target.value,
  //             }))
  //           }
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="">Profissão</label>
  //         <input
  //           type="text"
  //           name="profession"
  //           disabled={!profileEditMode}
  //           className={!profileEditMode ? 'viewMode' : ''}
  //           value={formProfile.profession}
  //           onChange={(event) =>
  //             setFormProfile((prevState) => ({
  //               ...prevState,
  //               profession: event.target.value,
  //             }))
  //           }
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="">Contato</label>
  //         <input
  //           type="text"
  //           name="contact"
  //           disabled={!profileEditMode}
  //           className={!profileEditMode ? 'viewMode' : ''}
  //           value={formProfile.contact}
  //           onChange={(event) =>
  //             setFormProfile((prevState) => ({
  //               ...prevState,
  //               contact: event.target.value,
  //             }))
  //           }
  //         />
  //       </div>

  //       {profileEditMode && (
  //         <div className="formControls">
  //           <button type="reset" onClick={() => setProfileEditMode(false)}>
  //             Cancelar
  //           </button>
  //           <button type="submit">Salvar</button>
  //         </div>
  //       )}
  //     </form>
  //   );
  // }

  // if (status === 'fetchFailed') {
  //   profileContent = (
  //     <div className="profileError">
  //       <p>Profile couldn't be loaded</p>
  //       <button onClick={tryAgainFetchProfileInfo}>Retry</button>
  //     </div>
  //   );
  // }

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        showMenu={showMenuHandler}
        githubUser={githubUser}
        id={userId}
      />
      <MainGrid type="profile" isMenuOpened={isMenuOpened}>
        <ProfileGridItem templateArea="profileArea">
          <UserInfo githubUser={githubUser} id={userId} />
        </ProfileGridItem>
        <ProfileGridItem templateArea="mainArea">
          <Profile as="section" profileEditMode={profileEditMode}>
            <header>
              <div className="profileHeaderContainer">
                <h2>Perfil</h2>
                {ownerId.toString() === userId ? (
                  true && !profileEditMode ? (
                    <button onClick={changeProfileModeHandler}>Editar</button>
                  ) : null
                ) : null}
              </div>
              {/* breadcrumbe */}
            </header>
            <article>
              {!isFirstLoading ? (
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
                      value={formProfile.city}
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
                      value={formProfile.state}
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
                      value={formProfile.profession}
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
                      value={formProfile.contact}
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
                <Spinner />
              )}
            </article>
          </Profile>
        </ProfileGridItem>
      </MainGrid>
      <Toaster position="bottom-right" />
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

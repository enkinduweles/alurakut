import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { MainGrid } from '../../src/components/MainGrid/MainGrid';
import { Box } from '../../src/components/Box/Box';
import { ProfileSidebar } from '../../src/components/ProfileSidebar/ProfileSidebar';
import { Profile, Wrapper } from '../../src/components/ProfilePages/styled';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';
import { Spinner } from '../../src/components/Spinner/Spinner';

import { useUserData } from '../../src/hooks/useUserData';
import { validateToken } from '../../src/utils/auth';
import { useDatoCMS } from '../../src/hooks/useDatoCMS';
import { shallowEqual } from '../../src/utils/shallowEquality';

const ProfilePages = (props) => {
  const { githubUser, id } = props;

  const router = useRouter();
  const { user } = router.query;
  const { getUserProfile, profileInfo, status, error } = useDatoCMS(true);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [formProfile, setFormProfile] = useState({
    city: '',
    state: '',
    profession: '',
    contact: '',
  });
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [tryFetchProfileInfo, setTryFetchProfileInfo] = useState(true);

  useEffect(() => {
    if (tryFetchProfileInfo) {
      getUserProfile(`query MyQuery {
        profileInfo(filter: {userId: {eq: "${id}"}}) {
          id
          profession
          city
          state
          contact
        }
      }`);
    }
    setTryFetchProfileInfo(false);
  }, [tryFetchProfileInfo]);

  useEffect(() => {
    if (status === 'completed') {
      const copyProfileInfoHookState = { ...profileInfo };

      delete copyProfileInfoHookState.id;
      setFormProfile(copyProfileInfoHookState);

      return;
    }
  }, [status]);

  const changeProfileModeHandler = async () => {
    setProfileEditMode((prevState) => !prevState);
  };

  const submitProfileInfoHandler = async (event) => {
    event.preventDefault();

    if (!shallowEqual(formProfile, profileInfo)) {
      await fetch(`/api/datoCMSContent?id=${profileInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProfile),
      });
    }

    setProfileEditMode((prevState) => !prevState);
  };

  const tryAgainFetchProfileInfo = () => {
    setTryFetchProfileInfo(true);
  };

  let profileContent = <Spinner />;

  if (status === 'completed') {
    profileContent = (
      <form className="userInfoForm" onSubmit={submitProfileInfoHandler}>
        <div>
          <label htmlFor="">Cidade:</label>
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
          <label htmlFor="">Estado:</label>
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
          <label htmlFor="">Profissão:</label>
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
          <label htmlFor="">Contato:</label>
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
        {profileEditMode && <button type="submit">Salvar</button>}
      </form>
    );
  }

  if (status === 'failed') {
    profileContent = (
      <div className="profileError">
        <p>Profile couldn't be loaded</p>
        <button onClick={tryAgainFetchProfileInfo}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        showMenu={() => setIsMenuOpened((prevState) => !prevState)}
        githubUser={githubUser}
      />
      <MainGrid type="profile" isMenuOpened={isMenuOpened}>
        <Wrapper templateArea="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </Wrapper>
        <Wrapper templateArea="mainArea">
          <Profile as="section" profileEditMode={profileEditMode}>
            <header>
              <div className="profileHeaderContainer">
                <h2>Perfil</h2>
                {githubUser === user
                  ? !error && (
                      <button onClick={changeProfileModeHandler}>Editar</button>
                    )
                  : null}
              </div>
              {/* breadcrumbe */}
            </header>
            <article>{profileContent}</article>
          </Profile>
        </Wrapper>
      </MainGrid>
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
      id,
    },
  };
}

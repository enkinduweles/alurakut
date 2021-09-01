import React, { Fragment, useEffect, useState } from 'react';
import { FaSadCry } from 'react-icons/fa';

import Box from '../src/components/Box/Box';
import MainGrid from '../src/components/MainGrid/MainGrid';
import ProfileRelations from '../src/components/ProfileRelations/ProfileRelations';
import UserInfo from '../src/components/UserInfo/UserInfo';
import Spinner from '../src/components/Spinner/Spinner';
import ProfileRelationsContent from '../src/components/ProfileRelationsContent/ProfileRelationsContent';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import { validateToken } from '../src/utils/auth';
import { useDatoCMS } from '../src/hooks/useDatoCMS';

const Home = (props) => {
  const { githubUser, id } = props;

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { getData, data: datoContent, isFirstLoading } = useDatoCMS();

  useEffect(() => {
    if (isFirstLoading) {
      const fetchData = async () => {
        await getData({
          content: 'communities',
          queryParams: { userId: `?userId=${id}` },
        });
      };

      fetchData();
    }
  }, [getData, id, isFirstLoading]);

  const addCommunityHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      name: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser,
    };

    const response = await fetch('/api/datoCMSContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    });

    const parsedResponse = await response.json();

    setCommunities((prevCommunities) => [
      ...prevCommunities,
      parsedResponse.data,
    ]);
  };

  return (
    <Fragment>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        githubUser={githubUser}
        showMenu={() => setIsMenuOpened((prevState) => !prevState)}
        id={id}
      />
      {!isFirstLoading ? (
        <MainGrid isMenuOpened={isMenuOpened}>
          <div className="profileArea" style={{ gridArea: 'profileArea' }}>
            <UserInfo as="aside" githubUser={githubUser} id={id} />
          </div>
          <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
            <Box>
              <h1 className="title">Bem vindo, {githubUser}</h1>
              <OrkutNostalgicIconSet recados={10} />
            </Box>

            <Box>
              <h2>O que você deseja fazer?</h2>

              <form onSubmit={addCommunityHandler}>
                <div>
                  <input
                    type="text"
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="title"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Coloque uma URL para usarmos de capa."
                    name="image"
                    aria-label="Coloque uma URL para usarmos de capa."
                  />
                </div>

                <button>Create</button>
              </form>
            </Box>
          </div>

          <div
            className="profileRelationsArea"
            style={{ gridArea: 'profileRelationsArea' }}
          >
            <ProfileRelations>
              {false ? (
                <ProfileRelationsContent
                  title="Following"
                  data={followingUsers}
                  type="profile"
                />
              ) : (
                <p className="noFriends">
                  <FaSadCry /> you didn&apos;t add friends yet
                </p>
              )}
            </ProfileRelations>
            <ProfileRelations>
              {datoContent && datoContent.length !== 0 ? (
                <ProfileRelationsContent
                  title="Communities"
                  data={datoContent}
                  type="community"
                />
              ) : (
                <p className="noCommunities">
                  <FaSadCry /> no communities yet
                </p>
              )}
            </ProfileRelations>
          </div>
        </MainGrid>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Home;

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

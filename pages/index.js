import React, { Fragment, useEffect, useState } from 'react';

import { Box } from '../src/components/Box/Box';
import { MainGrid } from '../src/components/MainGrid/MainGrid';
import { ProfileRelations } from '../src/components/ProfileRelations/ProfileRelations';
import { ProfileSidebar } from '../src/components/ProfileSidebar/ProfileSidebar';
import { ProfileRelationsContent } from '../src/components/ProfileRelationsContent/ProfileRelationsContent';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

const GITHUB_USER = 'enkinduweles';
const USERS_TO_FOLLOW = [
  'juunegreiros',
  'omariosouto',
  'peas',
  'rafaballerini',
  'marcobrunodev',
  'felipefialho',
  'enkinduweles',
];

const Home = (props) => {
  const [communities, setCommunities] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    const fetchDataGitHub = async () => {
      const response = await fetch(
        'https://api.github.com/users/enkinduweles/following'
      );
      const parsedResponse = await response.json();

      const mappedResponse = parsedResponse.map((user) => {
        const { id, avatar_url, login } = user;
        return {
          id,
          name: login,
          imageUrl: avatar_url,
        };
      });

      setFollowingUsers(mappedResponse);
    };

    const fetchDataDatoCMS = async () => {
      const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_READ_ONLY_TOKEN,
        },
        body: JSON.stringify({
          query: `query {
            allCommunities {
              id
              name
              creatorSlug
              imageUrl
            }
          }`,
        }),
      });

      const parsedResponse = await response.json();

      setCommunities(parsedResponse.data.allCommunities);
    };

    fetchDataGitHub();
    fetchDataDatoCMS();
  }, []);

  const addCommunityHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      name: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: GITHUB_USER,
    };

    const response = await fetch('/api/communities', {
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

  if (!followingUsers.length > 0) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <AlurakutMenu
        isMenuOpened={isMenuOpened}
        githubUser={GITHUB_USER}
        showMenu={() => setIsMenuOpened((prevState) => !prevState)}
      />

      <MainGrid isMenuOpened={isMenuOpened}>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={GITHUB_USER} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo, {GITHUB_USER}</h1>
            <OrkutNostalgicIconSet />
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
            <ProfileRelationsContent title="Following" data={followingUsers} />
          </ProfileRelations>
          <ProfileRelations>
            <ProfileRelationsContent title="Communities" data={communities} />
          </ProfileRelations>
        </div>
      </MainGrid>
    </Fragment>
  );
};

export default Home;

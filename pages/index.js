import React, { Fragment, useState } from 'react';

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
  const [communities, setCommunities] = useState([
    {
      id: '2839138',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
  ]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const addCommunityHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
    };

    setCommunities((prevCommunities) => [...prevCommunities, community]);
  };

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
            <ProfileRelationsContent title="Following" data={USERS_TO_FOLLOW} />
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

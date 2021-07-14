import React, { Fragment } from 'react';

import { Box } from '../src/components/Box/Box';
import { MainGrid } from '../src/components/MainGrid/MainGrid';
import { ProfileRelations } from '../src/components/ProfileRelations/ProfileRelations';
import { ProfileSidebar } from '../src/components/ProfileSidebar/ProfileSidebar';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

const Home = (props) => {
  console.log(props);
  const githubUser = 'enkinduweles';
  const usersToFollow = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  return (
    <Fragment>
      <AlurakutMenu />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo, {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelations>
            <h2 className="smallTitle">Following ({usersToFollow.length})</h2>

            <ul>
              {usersToFollow.map((user) => {
                return (
                  <li key={user}>
                    <a href="#">
                      <img
                        src={`https://github.com/${user}.png`}
                        alt={`Profile photo of ${user}`}
                      />
                      <span>{user}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelations>
        </div>
      </MainGrid>
    </Fragment>
  );
};

export default Home;

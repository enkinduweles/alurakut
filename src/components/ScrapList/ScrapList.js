import React from 'react';
import { MdDelete } from 'react-icons/md';

import Scrap from '../Scrap/Scrap';
import Paper from '../UI/surfaces/Paper/PaperBase';
import Avatar from '../UI/display/Avatar/AvatarBase';
import Box from '../UI/layout/Box/Box';

import { List, ListItem, ScrapListWrapper } from './styled';

const ScrapList = ({ scraps, githubUser, onDeleteScrap }) => {
  return (
    <ScrapListWrapper>
      <h2>
        Página de recados de {githubUser} ({scraps.length})
      </h2>
      <div>{/* pagination controls */}</div>
      <div className="scraps">
        <List>
          {scraps.map(({ id, author, message }) => {
            return (
              <ListItem key={id}>
                <Paper>
                  <Scrap
                    layout="intrinsic"
                    src={`https://github.com/${author}.png`}
                    alt={author}
                    width={250}
                    height={250}
                    scrapId={id}
                    author={author}
                    message={message}
                  />
                </Paper>
              </ListItem>
            );
          })}
        </List>
      </div>
    </ScrapListWrapper>
  );
};

export default ScrapList;

import React from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';

import { List, ListItem, ScrapListWrapper } from './styled';

export const ScrapList = ({ scraps, githubUser, onDeleteScrap }) => {
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
                <Image src={`https://github.com/${author}.png`} alt={author} />
                <div className="userScrap">
                  <div className="header">
                    <h3>{author}</h3>
                    <MdDelete onClick={() => onDeleteScrap(id)} />
                  </div>
                  <p>{message}</p>
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
    </ScrapListWrapper>
  );
};

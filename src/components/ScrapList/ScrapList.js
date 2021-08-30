import React from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';

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
                <div>
                  <Image
                    layout="intrinsic"
                    src={`https://github.com/${author}.png`}
                    alt={author}
                    width={80}
                    height={80}
                  />
                </div>
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

export default ScrapList;

import React from 'react';

import NextImage from '../NextImage/NextImage';
import {
  ProfileList,
  Link,
  Label,
  Header,
  ProfileListItem,
  SeeAll,
} from './styled';

const ProfileRelations = ({
  title,
  data,
  rootPath,
  type,
  total,
  userName,
  userId,
}) => {
  return (
    <>
      <Header className="smallTitle">
        {title} ({data.length})
      </Header>

      <ProfileList>
        {data.map((item) => {
          const src = item.thumbnail ? item.thumbnail.url : item.avatar;
          return (
            <ProfileListItem key={item.id}>
              <Link
                href={`/${rootPath}/${item.name}${
                  title.toLowerCase() === 'communities'
                    ? `?id=${item.id}`
                    : `?userId=${item.githubId}`
                } `}
              >
                <NextImage src={src} alt={item.name} />

                <Label>{item.name}</Label>
              </Link>
            </ProfileListItem>
          );
        })}
      </ProfileList>
      {total > 6 && (
        <SeeAll href={`/${rootPath}/${userName}?userId=${userId}`}>
          See All
        </SeeAll>
      )}
    </>
  );
};

export default ProfileRelations;

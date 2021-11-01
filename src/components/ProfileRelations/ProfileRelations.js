import React from 'react';
import Image from 'next/image';

import SeeAllLink from '../ui/navigation/Link/Link';
import { ListItem } from '../ui/display/List/styled';
import Cover from '../ui/display/Avatar/Avatar';
import { ProfileList, Link, Label, Header } from './styled';

const ProfileRelations = ({ title, data, destination, type, totalData }) => {
  return (
    <>
      <Header className="smallTitle">
        {title} ({data.length})
      </Header>

      <ProfileList>
        {data.map((item) => {
          return (
            <ListItem key={item.id}>
              <Link
                href={`/${destination}/${item.name}${
                  title.toLowerCase() === 'communities'
                    ? `?id=${item.id}`
                    : `?userId=${item.githubId}`
                } `}
              >
                <Cover
                  layout="fill"
                  src={item.avatar}
                  alt={item.name}
                  type={type}
                />

                <Label>{item.name}</Label>
              </Link>
            </ListItem>
          );
        })}
      </ProfileList>
      {totalData > 6 && (
        <SeeAllLink className="boxLink" href="#">
          See All
        </SeeAllLink>
      )}
    </>
  );
};

export default ProfileRelations;

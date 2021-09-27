import React from 'react';
import Image from 'next/image';

import SeeAllLink from '../UI/Navigation/Link/Link';
import { ProfileList, Link, Label, ImageWrapper, Header } from './styled';
import { ListItem } from '../UI/display/List/styled';

const ProfileRelations = ({ title, data, type }) => {
  console.log(data);

  let dataLimitedBy = [...data];

  if (data.length > 6) {
    dataLimitedBy.splice(6, data.length - 5);
  }

  return (
    <>
      <Header className="smallTitle">
        {title} ({data.length})
      </Header>

      <ProfileList>
        {dataLimitedBy.map((item) => {
          return (
            <ListItem key={item.id}>
              <Link href={`/${type}/${item.name}?id=${item.id}`}>
                <ImageWrapper>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                </ImageWrapper>
                <Label>{item.name}</Label>
              </Link>
            </ListItem>
          );
        })}
      </ProfileList>
      {data.length > 6 && (
        <SeeAllLink className="boxLink" href="#">
          See All
        </SeeAllLink>
      )}
    </>
  );
};

export default ProfileRelations;

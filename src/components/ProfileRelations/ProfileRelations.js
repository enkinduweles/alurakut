import Link from '../ui/navigation/Link/Link';

import defaultImage from '../../../public/default_image.svg';
import defaultAvatar from '../../../public/default_avatar.svg';

import NextImage from '../NextImage/NextImage';
import {
  ProfileList,
  ItemLink,
  Label,
  Header,
  ProfileListItem,
  SeeAll,
  Message,
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
  let defaultSrc = defaultAvatar;

  if (type === 'community') {
    defaultSrc = defaultImage;
  }

  return (
    <>
      <Header className="smallTitle">
        {title} {data.length ? `(${data.length})` : ''}
      </Header>
      <ProfileList>
        {data.map((item) => {
          const src = item.thumbnail ? item.thumbnail.url : item.avatar;
          return (
            <ProfileListItem key={item.id}>
              <ItemLink
                href={`/${rootPath}/${item.name}${
                  title.toLowerCase() === 'communities'
                    ? `?id=${item.id}`
                    : `?userId=${item.githubId}`
                } `}
              >
                <NextImage src={src ? src : defaultSrc} alt={item.name} />

                <Label>{item.name}</Label>
              </ItemLink>
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

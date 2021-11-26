import { Divider } from '../../../../components/ui/display/Divider/styled';
import Link from '../../../../components/ui/navigation/Link/Link';
import NextImage from '../../../../components/NextImage/NextImage';

import heartIcon from '../../../../../public/heart_icon.svg';
import cubeIcon from '../../../../../public/cube_icon.svg';
import smileIcon from '../../../../../public/smile_icon.svg';
import noteIcon from '../../../../../public/note_icon.svg';
import cameraIcon from '../../../../../public/camera_icon.svg';
import videoIcon from '../../../../../public/video_icon.svg';
import starIcon from '../../../../../public/star_icon.svg';

import {
  OrkutNostalgicIconSetList,
  OrkutNostalgicIconSetItem,
  IconWrapper,
  Header,
} from './styled';

const OrkutNostalgicIconSet = ({ userName, id, ...props }) => {
  return (
    <>
      <OrkutNostalgicIconSetList>
        {[
          { name: 'Recados', slug: 'scraps', icon: noteIcon },
          { name: 'Fotos', slug: 'fotos', icon: cameraIcon },
          { name: 'Videos', slug: 'videos', icon: videoIcon },
          { name: 'Fãs', slug: 'fas', icon: starIcon },
        ].map(({ name, slug, icon }) => (
          <OrkutNostalgicIconSetItem key={`orkut__icon_set__${slug}`}>
            <Link href={`${slug}/${userName}?userId=${id}`}>
              <span>{name}</span>
              <div>
                <IconWrapper>
                  <NextImage
                    key={`orkut__icon_set__${slug}_img`}
                    src={icon}
                    alt=""
                    objectFit="contain"
                  />
                </IconWrapper>
                <span>{props[slug] ? props[slug] : 0}</span>
              </div>
            </Link>
          </OrkutNostalgicIconSetItem>
        ))}
      </OrkutNostalgicIconSetList>
    </>
  );
};

export default OrkutNostalgicIconSet;

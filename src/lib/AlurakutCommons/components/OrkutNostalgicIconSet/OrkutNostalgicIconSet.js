import Image from 'next/image';
import Link from '../../../../components/ui/navigation/Link/Link';

import {
  OrkutNostalgicIconSetList,
  PersonalityIconSet,
  IconsSetContainer,
} from './styled';

const OrkutNostalgicIconSet = ({
  onChangePersonalityStatus,
  userName,
  id,
  ...props
}) => {
  return (
    <IconsSetContainer>
      <OrkutNostalgicIconSetList>
        {[
          { name: 'Recados', slug: 'scraps', icon: 'book' },
          { name: 'Fotos', slug: 'fotos', icon: 'camera' },
          { name: 'Videos', slug: 'videos', icon: 'video-camera' },
          // { name: 'Fãs', slug: 'fas', icon: 'star' },
          // { name: 'Mensagens', slug: 'mensagens', icon: 'email' },
        ].map(({ name, slug, icon }) => (
          <li key={`orkut__icon_set__${slug}`}>
            <Link href={`${slug}/${userName}?userId=${id}`}>
              <span
                style={{ gridArea: 'title' }}
                className="OrkutNostalgicIconSet__title"
              >
                {name}
              </span>
              <span
                className="OrkutNostalgicIconSet__number"
                style={{ gridArea: 'number' }}
              >
                <div className="OrkutNostalgicIconSet__iconSample">
                  <Image
                    layout="fill"
                    key={`orkut__icon_set__${slug}_img`}
                    src={`https://alurakut.vercel.app/icons/${icon}.svg`}
                    alt=""
                    objectFit="contain"
                  />
                </div>
                {props[slug] ? props[slug] : 0}
              </span>
            </Link>
          </li>
        ))}
      </OrkutNostalgicIconSetList>

      <PersonalityIconSet>
        {[
          { name: 'Confiável', slug: 'reliable', icon: 'smile' },
          { name: 'Legal', slug: 'nice', icon: 'cool' },
          { name: 'Sexy', slug: 'sexy', icon: 'heart' },
        ].map(({ name, slug, icon }) => {
          const total = props[slug];
          return (
            <li key={`orkut__icon_set__${slug}`}>
              <span className="OrkutNostalgicIconSet__title">{name}</span>
              <span
                className="OrkutNostalgicIconSet__number"
                style={{ gridArea: 'number' }}
              >
                {[0, 1, 2].map((_, index) => {
                  const isHeartActive = index <= total - 1;
                  // const isHeartActive = false;
                  return (
                    <div
                      key={`orkut__icon_set__${slug}_img_${index}`}
                      className="OrkutNostalgicIconSet__iconComplex"
                      style={{
                        marginRight: '2px',
                        opacity: isHeartActive ? 1 : '0.5',
                      }}
                      onClick={() => onChangePersonalityStatus(slug, index + 1)}
                    >
                      <Image
                        layout="fill"
                        src={`https://alurakut.vercel.app/icons/${icon}.svg`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </span>
            </li>
          );
        })}
      </PersonalityIconSet>
    </IconsSetContainer>
  );
};

export default OrkutNostalgicIconSet;

import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import Link from '../../lib/AlurakutCommons/components/Link';

const ProfileRelationsContent = (props) => {
  const { title, data, type } = props;

  console.log(data);

  let dataLimitedBy = [...data];

  if (data.length > 6) {
    dataLimitedBy.splice(6, data.length - 5);
  }

  return (
    <Fragment>
      <h2 className="smallTitle">
        {title} ({data.length})
      </h2>

      <ul>
        {dataLimitedBy.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/${type}/${item.name}?id=${item.id}`}>
                <div>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={item.imageUrl}
                    alt={item.name}
                    priority
                  />
                </div>
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {data.length > 6 && (
        <a className="boxLink" href="#">
          See All
        </a>
      )}
    </Fragment>
  );
};

ProfileRelationsContent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileRelationsContent;

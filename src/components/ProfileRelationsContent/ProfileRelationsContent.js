import { Fragment } from 'react';
import Link from 'next/link';

export const ProfileRelationsContent = (props) => {
  const { title, data } = props;

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
              <Link href={`/profile/${item.name}?id=${item.id}`}>
                <a>
                  <img src={item.imageUrl} alt={item.name} />
                  <span>{item.name}</span>
                </a>
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

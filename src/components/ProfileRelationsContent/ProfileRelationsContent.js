import { Fragment } from 'react';

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
            <li key={item.id || item}>
              <a href="#">
                <img
                  src={item.image || `https://github.com/${item}.png`}
                  alt={item.title || item}
                />
                <span>{item.title || item}</span>
              </a>
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

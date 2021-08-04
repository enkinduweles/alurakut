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
            <li key={item.id}>
              <a href="#">
                <img src={item.imageUrl} alt={item.name} />
                <span>{item.name}</span>
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

import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { BreadcrumbWrapper, Crumb } from './styled';

const Breadcrumb = () => {
  const { pathname } = useRouter();
  const splitedPathName = pathname.split('/');
  console.log(splitedPathName);
  const filteredPath = splitedPathName.filter((item) => {
    return !item.includes('[');
  });
  console.log(filteredPath);

  const crumbs = filteredPath.map((item) => {
    if (item === '') {
      return 'Início';
    }
    return item;
  });
  console.log(crumbs);
  return (
    <nav>
      <BreadcrumbWrapper>
        {crumbs.map((item, index) => {
          const separator =
            crumbs.length - 1 === index ? null : (
              <li>
                <MdKeyboardArrowRight />
              </li>
            );

          return (
            <Fragment key={index}>
              <li>
                <Crumb
                  href={index === 0 ? '/' : `/${item}`}
                  active={crumbs.length - 1 === index}
                >
                  {item}
                </Crumb>
              </li>
              {separator}
            </Fragment>
          );
        })}
      </BreadcrumbWrapper>
    </nav>
  );
};

export default Breadcrumb;

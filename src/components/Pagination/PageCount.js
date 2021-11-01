import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { PageCountWrapper } from './styled';

const PageCount = ({
  counters: { firstCountMark, lastCountMark, totalFriends },
}) => {
  //final - ((page * limitBy) - 5 ) + (totalFriendsPage - 1)
  //inicio ---> (page * limitBy) - 5

  return (
    <PageCountWrapper>
      <span>
        mostrando {firstCountMark}-{lastCountMark} de {totalFriends}
      </span>
    </PageCountWrapper>
  );
};

export default memo(PageCount);

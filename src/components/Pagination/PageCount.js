import React, { memo } from 'react';
import { MdDelete } from 'react-icons/md';

import { PageCountWrapper, ButtonWrapper, Badge, DeleteItem } from './styled';

const PageCount = ({
  counters: { firstCountMark, lastCountMark, total },
  selectedItems,
  onShowModal,
}) => {
  return (
    <PageCountWrapper>
      <span>
        mostrando {firstCountMark}-{lastCountMark} de {total}
      </span>
      {selectedItems.length > 0 && (
        <ButtonWrapper onClick={onShowModal}>
          <Badge>{selectedItems.length}</Badge>
          <DeleteItem>
            <MdDelete />
          </DeleteItem>
        </ButtonWrapper>
      )}
    </PageCountWrapper>
  );
};

export default memo(PageCount);

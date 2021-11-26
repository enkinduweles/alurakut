import { memo } from 'react';

import NextImage from '../NextImage/NextImage';

import { PageCountWrapper, ButtonWrapper, Badge, IconWrapper } from './styled';

const PageCount = ({
  counters: { firstCountMark, lastCountMark, total },
  selectedItems,
  onShowModal,
  icon,
}) => {
  return (
    <PageCountWrapper>
      <span>
        mostrando {firstCountMark}-{lastCountMark} de {total}
      </span>
      {selectedItems.length > 0 && (
        <ButtonWrapper onClick={onShowModal}>
          <Badge>{selectedItems.length}</Badge>
          <IconWrapper>
            <NextImage src={icon} />
          </IconWrapper>
        </ButtonWrapper>
      )}
    </PageCountWrapper>
  );
};

export default memo(PageCount);

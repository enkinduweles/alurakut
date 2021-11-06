import React from 'react';
import { Button } from '../ui/inputs/Button/styled';

import { Message, ControlsWrapper } from './styled';

const DialogBox = ({
  onShowModal,
  onDelete,
  items,
  userId,
  onCleanItemsToDelete,
  content,
}) => {
  const deleteItemHandler = async () => {
    await onDelete({
      content: content,
      queryParams: {
        userId,
      },
      items,
    });

    onCleanItemsToDelete([]);
    onShowModal();
  };

  return (
    <div>
      <Message>
        Você tem certeza que deseja deletar o(s) item(s) selecionado(s) ?
      </Message>
      <ControlsWrapper>
        <Button outline onClick={onShowModal}>
          Cancelar
        </Button>
        <Button onClick={deleteItemHandler}>Confirmar</Button>
      </ControlsWrapper>
    </div>
  );
};

export default DialogBox;

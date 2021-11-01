import React from 'react';
import { Button } from '../ui/inputs/Button/styled';

import { Message, ControlsWrapper } from './styled';

const DialogBox = ({
  showModal,
  onDeleteFriend,
  items,
  userId,
  cleanUsersToDelete,
}) => {
  const deleteFriendHandler = async () => {
    await onDeleteFriend({
      content: 'friends',
      queryParams: {
        userId,
        limitBy: 6,
        items,
      },
    });

    cleanUsersToDelete([]);
    showModal();
  };

  return (
    <div>
      <Message>
        Você tem certeza que deseja deletar o(s) usuário(s) selecionado(s) ?
      </Message>
      <ControlsWrapper>
        <Button outline onClick={showModal}>
          Cancelar
        </Button>
        <Button onClick={deleteFriendHandler}>Confirmar</Button>
      </ControlsWrapper>
    </div>
  );
};

export default DialogBox;

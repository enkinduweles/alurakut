import { useState, useCallback } from 'react';

export const usePageOperations = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [modalContentName, setModalContentName] = useState('');

  const showMenuHandler = useCallback(
    () => setIsMenuOpened((prevState) => !prevState),
    []
  );

  const showModalHandler = useCallback((name) => {
    setIsModalOpened((prevState) => !prevState);
    if (name) {
      setModalContentName(name);
    }
  }, []);

  const checkCardHandler = useCallback(
    (contentId, isCardChecked) => {
      if (!isCardChecked) {
        const filteredItems = itemsToDelete.filter((item) => {
          return contentId !== item;
        });

        setItemsToDelete(filteredItems);
      } else {
        setItemsToDelete((prevState) => [...prevState, contentId]);
      }
    },
    [itemsToDelete]
  );

  return {
    isMenuOpened,
    isModalOpened,
    itemsToDelete,
    modalContentName,
    onShowMenu: showMenuHandler,
    onShowModal: showModalHandler,
    onCheckCard: checkCardHandler,
    onCleanItemsToDelete: setItemsToDelete,
  };
};

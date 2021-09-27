import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../../inputs/Button/styled';

import { DrawerWrapper, DrawerContent, DrawerHeader } from './styled';

const Drawer = ({ children, showMenu, isMenuOpened }) => {
  const [activeTransition, setActiveTransition] = useState(false);
  const modalContentRef = useRef();

  useEffect(() => {
    const refModal = modalContentRef.current;

    const overlayClickHandler = (event) => {
      const isClickInsideElement = refModal.contains(event.target);

      console.log(isClickInsideElement);
      if (!isClickInsideElement) {
        showMenu();
      }
    };

    document.addEventListener('click', overlayClickHandler);

    return () => {
      document.removeEventListener('click', overlayClickHandler);
    };
  }, []);

  useEffect(() => {
    setActiveTransition(true);
  }, []);
  return (
    <>
      <DrawerWrapper isTransitionActived={activeTransition}>
        <DrawerContent ref={modalContentRef}>
          <DrawerHeader>
            <Button onClick={() => showMenu()}>X</Button>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </DrawerWrapper>
    </>
  );
};

export default Drawer;

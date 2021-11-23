import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../../inputs/Button/styled';

import { ModalWrapper, ModalContent, ModalHeader } from './styled';

const Modal = ({ children, showModal }) => {
  const [activeTransition, setActiveTransition] = useState(false);
  const modalContentRef = useRef();

  useEffect(() => {
    const refModal = modalContentRef.current;

    const overlayClickHandler = (event) => {
      const isClickInsideElement = refModal.contains(event.target);

      if (!isClickInsideElement) {
        showModal();
      }
    };

    document.addEventListener('click', overlayClickHandler);

    return () => {
      document.removeEventListener('click', overlayClickHandler);
    };
  }, [showModal]);

  useEffect(() => {
    setActiveTransition(true);
  }, []);
  return (
    <ModalWrapper isTransitionActived={activeTransition}>
      <ModalContent ref={modalContentRef}>
        <ModalHeader>
          <Button onClick={() => showModal()}>X</Button>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

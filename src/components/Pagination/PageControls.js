import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { ControlButton, Separator, ControlsWrapper } from './styled';

const PageControls = ({
  userName,
  userId,
  currentPage,
  lastPage,
  requestProcess,
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState({
    previous: false,
    next: false,
  });

  const router = useRouter();
  useEffect(() => {
    if (requestProcess === 'pending') {
      console.log('if true');
      toast.loading('Loading...');
    } else {
      console.log('if false');

      setButtonsDisabled({
        previous: currentPage === 1,
        next: currentPage === lastPage,
      });
    }
    return () => {
      console.log('cleanup');

      toast.dismiss();
    };
  }, [requestProcess]);

  // useEffect(() => {
  //   if (requestProcess === 'completed') {
  //     console.log('entrei');
  //     setButtonsDisabled({
  //       previous: currentPage === 1,
  //       next: currentPage === lastPage,
  //     });
  //   }
  // }, [currentPage, lastPage, requestProcess]);

  const nextPageHandler = () => {
    toast.loading('Loading...');
    router.push(`/friends/${userName}?id=${userId}&page=${currentPage + 1}`);
  };
  console.log('Page Control Rendered');
  return (
    <ControlsWrapper>
      <ControlButton outline disabled={buttonsDisabled.previous}>
        primeira
      </ControlButton>
      <Separator>|</Separator>
      <ControlButton
        outline
        disabled={buttonsDisabled.previous}
        onClick={() =>
          router.push(
            `/friends/${userName}?id=${userId}&page=${currentPage - 1}`
          )
        }
      >
        anterior
      </ControlButton>
      <Separator>|</Separator>
      <ControlButton
        outline
        disabled={buttonsDisabled.next}
        onClick={nextPageHandler}
      >
        próxima
      </ControlButton>
      <Separator>|</Separator>
      <ControlButton outline disabled={buttonsDisabled.next}>
        última
      </ControlButton>
    </ControlsWrapper>
  );
};

export default PageControls;
